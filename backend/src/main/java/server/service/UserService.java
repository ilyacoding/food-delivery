package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Role;
import server.entity.User;
import server.exception.EntityNotFoundException;
import server.repository.RoleRepository;
import server.repository.SupplierProfileRepository;
import server.repository.UserRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SupplierProfileRepository supplierProfileRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    private String USER_ROLE = "USER";
    private String SUPPLIER_ROLE = "SUPPLIER";

    private HashSet<String> roles = new HashSet<>(Arrays.asList(USER_ROLE, SUPPLIER_ROLE));

    private final static Logger logger = LogManager.getLogger(UserService.class);
    
    public User create(User user, String role) throws Exception {
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            if (!roles.contains(role)) {
                role = USER_ROLE;
            }
            Role userRole = roleRepository.findByName(role);
            user.setRoles(new HashSet<Role>() {{ add(userRole); }});
            return repository.save(user);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public User update(Long id, User newUser) throws Exception {
        try {
            Optional<User> optionalUser = repository.findById(id);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (newUser.getPassword() != null) {
                    user.setPassword(encoder.encode(newUser.getPassword()));
                }

                if (newUser.getFirstName() != null) {
                    user.setFirstName(newUser.getFirstName());
                }

                if (newUser.getLastName() != null) {
                    user.setLastName(newUser.getLastName());
                }

                if (newUser.getPhoneNumber() != null) {
                    user.setPhoneNumber(newUser.getPhoneNumber());
                }
                return repository.save(user);
            } else {
                throw new EntityNotFoundException(User.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public void delete(Long id) throws Exception {
        try {
            Optional<User> user = repository.findById(id);
            if (user.isPresent()) {
                repository.delete(user.get());
            } else {
                throw new EntityNotFoundException(User.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Iterable<User> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll(pageable);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<User> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Set<User> findByBirthday(LocalDate localDate) throws EntityNotFoundException {
        try {
            return repository.findByBirthday(localDate);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public User findById(Long id) throws EntityNotFoundException {
        try {
            Optional<User> user = repository.findById(id);
            if (user.isPresent()) {
                return user.get();
            } else {
                throw new EntityNotFoundException(User.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Optional<User> findByEmail(String email) {
        try {
            return repository.findByEmail(email);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

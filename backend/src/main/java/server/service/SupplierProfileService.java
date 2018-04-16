package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Role;
import server.entity.SupplierProfile;
import server.entity.User;
import server.exception.EntityNotFoundException;
import server.repository.RoleRepository;
import server.repository.SupplierProfileRepository;
import server.repository.UserRepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@Service
@Transactional
public class SupplierProfileService {

    @Autowired
    private SupplierProfileRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    public SupplierProfile create(SupplierProfile supplierProfile) throws Exception {
        try {
            return repository.save(supplierProfile);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public SupplierProfile update(Long id, SupplierProfile newSupplierProfile) throws Exception {
        try {
            Optional<SupplierProfile> optionalSuppplierProfile = repository.findById(id);
            if (optionalSuppplierProfile.isPresent()) {
                SupplierProfile supplierProfile = optionalSuppplierProfile.get();

                if (newSupplierProfile.getAddress() != null) {
                    supplierProfile.setAddress(newSupplierProfile.getAddress());
                }

                if (newSupplierProfile.getCity() != null) {
                    supplierProfile.setCity(newSupplierProfile.getCity());
                }

                if (newSupplierProfile.getCountry() != null) {
                    supplierProfile.setCountry(newSupplierProfile.getCountry());
                }

                if (newSupplierProfile.getDescription() != null) {
                    supplierProfile.setDescription(newSupplierProfile.getDescription());
                }

                if (newSupplierProfile.getFax() != null) {
                    supplierProfile.setFax(newSupplierProfile.getFax());
                }

                if (newSupplierProfile.getLogoImageUrl() != null) {
                    supplierProfile.setLogoImageUrl(newSupplierProfile.getLogoImageUrl());
                }

                if (newSupplierProfile.getState() != null) {
                    supplierProfile.setState(newSupplierProfile.getState());
                }

                if (newSupplierProfile.getWebsite() != null) {
                    supplierProfile.setWebsite(newSupplierProfile.getWebsite());
                }

                if (newSupplierProfile.getZip() != null) {
                    supplierProfile.setZip(newSupplierProfile.getZip());
                }

                return repository.save(supplierProfile);
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
            Optional<SupplierProfile> supplierProfile = repository.findById(id);
            if (supplierProfile.isPresent()) {
                repository.delete(supplierProfile.get());
            } else {
                throw new EntityNotFoundException(SupplierProfile.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Iterable<SupplierProfile> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll(pageable);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('SUPPLIER') or hasRole('ADMIN')")
    public SupplierProfile findById(Long id) throws EntityNotFoundException {
        try {
            Optional<SupplierProfile> supplierProfile = repository.findById(id);
            if (supplierProfile.isPresent()) {
                return supplierProfile.get();
            } else {
                throw new EntityNotFoundException(SupplierProfile.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Menu;
import server.exception.EntityNotFoundException;
import server.repository.MenuRepository;

import java.util.Optional;

@Service
@Transactional
public class MenuService {

    @Autowired
    private MenuRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('ADMIN')")
    public Menu create(Menu menu) throws Exception {
        try {
            return repository.save(menu);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Menu update(Long id, Menu newMenu) throws Exception {
        try {
            Optional<Menu> optionalMenu = repository.findById(id);
            if (optionalMenu.isPresent()) {
                Menu menu = optionalMenu.get();

                if (newMenu.getDescription() != null) {
                    menu.setDescription(newMenu.getDescription());
                }

                if (newMenu.getName() != null) {
                    menu.setName(newMenu.getName());
                }

                return repository.save(menu);
            } else {
                throw new EntityNotFoundException(Menu.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<Menu> menu = repository.findById(id);
            if (menu.isPresent()) {
                repository.delete(menu.get());
            } else {
                throw new EntityNotFoundException(Menu.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<Menu> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll(pageable);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<Menu> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Menu findById(Long id) throws EntityNotFoundException {
        try {
            Optional<Menu> menu = repository.findById(id);
            if (menu.isPresent()) {
                return menu.get();
            } else {
                throw new EntityNotFoundException(Menu.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.CartMenu;
import server.exception.EntityNotFoundException;
import server.repository.CartMenuRepository;

import java.util.Optional;

@Service
@Transactional
public class CartMenuService {

    @Autowired
    private CartMenuRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CartMenu create(CartMenu cartMenu) throws Exception {
        try {
            return repository.save(cartMenu);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<CartMenu> cartMenu = repository.findById(id);
            if (cartMenu.isPresent()) {
                repository.delete(cartMenu.get());
            } else {
                throw new EntityNotFoundException(CartMenu.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CartMenu findById(Long id) throws EntityNotFoundException {
        try {
            Optional<CartMenu> cartMenu = repository.findById(id);
            if (cartMenu.isPresent()) {
                return cartMenu.get();
            } else {
                throw new EntityNotFoundException(CartMenu.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

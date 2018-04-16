package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.ShoppingCart;
import server.exception.EntityNotFoundException;
import server.repository.ShoppingCartRepository;

import java.util.Optional;

@Service
@Transactional
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ShoppingCart create(ShoppingCart shoppingCart) throws Exception {
        try {
            return repository.save(shoppingCart);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<ShoppingCart> shoppingCart = repository.findById(id);
            if (shoppingCart.isPresent()) {
                repository.delete(shoppingCart.get());
            } else {
                throw new EntityNotFoundException(ShoppingCart.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ShoppingCart findById(Long id) throws EntityNotFoundException {
        try {
            Optional<ShoppingCart> shoppingCart = repository.findById(id);
            if (shoppingCart.isPresent()) {
                return shoppingCart.get();
            } else {
                throw new EntityNotFoundException(ShoppingCart.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

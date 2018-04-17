package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.UserOrder;
import server.exception.EntityNotFoundException;
import server.repository.UserOrderRepository;

import java.util.Optional;

@Service
@Transactional
public class UserOrderService {

    @Autowired
    private UserOrderRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserOrder create(UserOrder order) throws Exception {
        try {
            return repository.save(order);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserOrder findById(Long id) throws EntityNotFoundException {
        try {
            Optional<UserOrder> order = repository.findById(id);
            if (order.isPresent()) {
                return order.get();
            } else {
                throw new EntityNotFoundException(UserOrder.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<UserOrder> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

package server.repository;

import org.springframework.data.repository.CrudRepository;
import server.entity.ShoppingCart;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long> {
}

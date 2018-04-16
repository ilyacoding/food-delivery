package server.repository;

import org.springframework.data.repository.CrudRepository;
import server.entity.CartMenu;

public interface CartMenuRepository extends CrudRepository<CartMenu, Long> {
}

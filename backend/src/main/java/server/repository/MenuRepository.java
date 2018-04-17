package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.Menu;

public interface MenuRepository extends PagingAndSortingRepository<Menu, Long> {
}

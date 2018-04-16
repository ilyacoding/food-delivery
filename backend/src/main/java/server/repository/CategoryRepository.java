package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
}

package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.Meal;

public interface MealRepository extends PagingAndSortingRepository<Meal, Long> {
}

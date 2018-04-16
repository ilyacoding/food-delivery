package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.DurationTime;

public interface DurationTimeRepository extends PagingAndSortingRepository<DurationTime, Long> {
}

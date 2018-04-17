package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.UserOrder;

public interface UserOrderRepository extends PagingAndSortingRepository<UserOrder, Long> {
}

package server.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import server.entity.SupplierProfile;

public interface SupplierProfileRepository extends PagingAndSortingRepository<SupplierProfile, Long> {
}
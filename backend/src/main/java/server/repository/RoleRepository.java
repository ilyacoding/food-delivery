package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import server.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByName(@Param("name") String name);
}

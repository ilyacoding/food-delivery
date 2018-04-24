package server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import server.entity.User;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    @Query("SELECT user FROM User user LEFT JOIN FETCH user.roles WHERE user.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    Set<User> findByBirthday(@Param("birthday") LocalDate birthday);
}

package server.repository;

import org.springframework.data.repository.CrudRepository;
import server.entity.EmailTemplate;

public interface EmailTemplateRepository extends CrudRepository<EmailTemplate, Long> {
}

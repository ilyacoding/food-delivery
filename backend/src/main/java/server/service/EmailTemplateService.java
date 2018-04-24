package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.EmailTemplate;
import server.exception.EntityNotFoundException;
import server.repository.EmailTemplateRepository;
import server.repository.EmailTemplateRepository;

import java.util.Optional;

@Service
@Transactional
public class EmailTemplateService {

    @Autowired
    private EmailTemplateRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('ADMIN')")
    public EmailTemplate create(EmailTemplate emailTemplate) throws Exception {
        try {
            return repository.save(emailTemplate);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public EmailTemplate update(Long id, EmailTemplate newEmailTemplate) throws Exception {
        try {
            Optional<EmailTemplate> optionalEmailTemplate = repository.findById(id);
            if (optionalEmailTemplate.isPresent()) {
                EmailTemplate emailTemplate = optionalEmailTemplate.get();

                if (newEmailTemplate.getContent() != null) {
                    emailTemplate.setContent(newEmailTemplate.getContent());
                }

                return repository.save(emailTemplate);
            } else {
                throw new EntityNotFoundException(EmailTemplate.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<EmailTemplate> emailTemplate = repository.findById(id);
            if (emailTemplate.isPresent()) {
                repository.delete(emailTemplate.get());
            } else {
                throw new EntityNotFoundException(EmailTemplate.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<EmailTemplate> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public EmailTemplate findById(Long id) throws EntityNotFoundException {
        try {
            Optional<EmailTemplate> emailTemplate = repository.findById(id);
            if (emailTemplate.isPresent()) {
                return emailTemplate.get();
            } else {
                throw new EntityNotFoundException(EmailTemplate.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

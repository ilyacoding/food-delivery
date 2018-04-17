package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Category;
import server.exception.EntityNotFoundException;
import server.repository.CategoryRepository;

import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('ADMIN')")
    public Category create(Category category) throws Exception {
        try {
            return repository.save(category);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Category update(Long id, Category newCategory) throws Exception {
        try {
            Optional<Category> optionalCategory = repository.findById(id);
            if (optionalCategory.isPresent()) {
                Category category = optionalCategory.get();

                if (newCategory.getDescription() != null) {
                    category.setDescription(newCategory.getDescription());
                }

                if (newCategory.getName() != null) {
                    category.setName(newCategory.getName());
                }

                return repository.save(category);
            } else {
                throw new EntityNotFoundException(Category.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<Category> category = repository.findById(id);
            if (category.isPresent()) {
                repository.delete(category.get());
            } else {
                throw new EntityNotFoundException(Category.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<Category> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll(pageable);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<Category> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Category findById(Long id) throws EntityNotFoundException {
        try {
            Optional<Category> category = repository.findById(id);
            if (category.isPresent()) {
                return category.get();
            } else {
                throw new EntityNotFoundException(Category.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Meal;
import server.exception.EntityNotFoundException;
import server.repository.MealRepository;

import java.util.Optional;

@Service
@Transactional
public class MealService {

    @Autowired
    private MealRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    public Meal create(Meal meal) throws Exception {
        try {
            return repository.save(meal);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Meal update(Long id, Meal newMeal) throws Exception {
        try {
            Optional<Meal> optionalMeal = repository.findById(id);
            if (optionalMeal.isPresent()) {
                Meal meal = optionalMeal.get();

                if (newMeal.getCarbohydrates() != null) {
                    meal.setCarbohydrates(newMeal.getCarbohydrates());
                }

                if (newMeal.getFats() != null) {
                    meal.setFats(newMeal.getFats());
                }

                if (newMeal.getMass() != null) {
                    meal.setMass(newMeal.getMass());
                }

                if (newMeal.getName() != null) {
                    meal.setName(newMeal.getName());
                }

                if (newMeal.getProteins() != null) {
                    meal.setProteins(newMeal.getProteins());
                }

                if (newMeal.getSupplier_price() != null) {
                    meal.setSupplier_price(newMeal.getSupplier_price());
                }

                return repository.save(meal);
            } else {
                throw new EntityNotFoundException(Meal.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public void delete(Long id) throws Exception {
        try {
            Optional<Meal> meal = repository.findById(id);
            if (meal.isPresent()) {
                repository.delete(meal.get());
            } else {
                throw new EntityNotFoundException(Meal.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('SUPPLIER') or hasRole('ADMIN')")
    public Iterable<Meal> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('SUPPLIER') or hasRole('ADMIN')")
    public Meal findById(Long id) throws EntityNotFoundException {
        try {
            Optional<Meal> meal = repository.findById(id);
            if (meal.isPresent()) {
                return meal.get();
            } else {
                throw new EntityNotFoundException(Meal.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

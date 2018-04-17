package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.entity.DurationTime;
import server.exception.EntityNotFoundException;
import server.repository.DurationTimeRepository;

import java.util.Optional;

@Service
@Transactional
public class DurationTimeService {

    @Autowired
    private DurationTimeRepository repository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @PreAuthorize("hasRole('ADMIN')")
    public DurationTime create(DurationTime durationTime) throws Exception {
        try {
            return repository.save(durationTime);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public DurationTime update(Long id, DurationTime newDurationTime) throws Exception {
        try {
            Optional<DurationTime> optionalDurationTime = repository.findById(id);
            if (optionalDurationTime.isPresent()) {
                DurationTime durationTime = optionalDurationTime.get();

                if (newDurationTime.getDaysAmount() != null) {
                    durationTime.setDaysAmount(newDurationTime.getDaysAmount());
                }

                if (newDurationTime.getDiscountCoefficient() != null) {
                    durationTime.setDiscountCoefficient(newDurationTime.getDiscountCoefficient());
                }

                return repository.save(durationTime);
            } else {
                throw new EntityNotFoundException(DurationTime.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) throws Exception {
        try {
            Optional<DurationTime> durationTime = repository.findById(id);
            if (durationTime.isPresent()) {
                repository.delete(durationTime.get());
            } else {
                throw new EntityNotFoundException(DurationTime.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<DurationTime> findAll(Pageable pageable) throws Exception {
        try {
            return repository.findAll(pageable);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public Iterable<DurationTime> findAll() throws Exception {
        try {
            return repository.findAll();
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    public DurationTime findById(Long id) throws EntityNotFoundException {
        try {
            Optional<DurationTime> durationTime = repository.findById(id);
            if (durationTime.isPresent()) {
                return durationTime.get();
            } else {
                throw new EntityNotFoundException(DurationTime.class, "id", id.toString());
            }
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }
}

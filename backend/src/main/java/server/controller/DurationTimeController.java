package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.DurationTime;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.DurationTimeService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/duration_times")
public class DurationTimeController {

    @Autowired
    private DurationTimeService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index(Pageable pageable) throws Exception {
        Iterable<DurationTime> list = service.findAll(pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        DurationTime durationTime = service.findById(id);
        return new ResponseEntity<>(durationTime, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid DurationTime durationTime) throws Exception {
        durationTime = service.create(durationTime);
        logger.info("Created new durationTime with id = " + durationTime.getId());
        return new ResponseEntity<>(durationTime, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody DurationTime durationTime) throws Exception {
        durationTime = service.update(id, durationTime);
        logger.info("Updated durationTime with id = " + id);
        return new ResponseEntity<>(durationTime, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted durationTime with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

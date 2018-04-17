package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.Meal;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.MealService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/meals")
public class MealController {

    @Autowired
    private MealService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index(Pageable pageable) throws Exception {
        Iterable<Meal> list = service.findAll(pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        Meal meal = service.findById(id);
        return new ResponseEntity<>(meal, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Meal meal) throws Exception {
        meal = service.create(meal);
        logger.info("Created new meal with id = " + meal.getId());
        return new ResponseEntity<>(meal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Meal meal) throws Exception {
        meal = service.update(id, meal);
        logger.info("Updated meal with id = " + id);
        return new ResponseEntity<>(meal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted meal with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

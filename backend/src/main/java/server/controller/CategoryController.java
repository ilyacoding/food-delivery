package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.Category;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.CategoryService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index(Pageable pageable) throws Exception {
        Iterable<Category> list = service.findAll(pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        Category category = service.findById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Category category) throws Exception {
        category = service.create(category);
        logger.info("Created new category with id = " + category.getId());
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Category category) throws Exception {
        category = service.update(id, category);
        logger.info("Updated category with id = " + id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted category with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

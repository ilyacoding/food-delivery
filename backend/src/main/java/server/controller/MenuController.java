package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.Menu;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.MenuService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/menus")
public class MenuController {

    @Autowired
    private MenuService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index(Pageable pageable) throws Exception {
        Iterable<Menu> list = service.findAll(pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        Menu menu = service.findById(id);
        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Menu menu) throws Exception {
        menu = service.create(menu);
        logger.info("Created new menu with id = " + menu.getId());
        return new ResponseEntity<>(menu, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Menu menu) throws Exception {
        menu = service.update(id, menu);
        logger.info("Updated menu with id = " + id);
        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted menu with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

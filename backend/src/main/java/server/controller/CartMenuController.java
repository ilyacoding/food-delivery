package server.controller;

import server.entity.CartMenu;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.CartMenuService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/cart_menus")
public class CartMenuController {

    @Autowired
    private CartMenuService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        CartMenu cartMenu = service.findById(id);
        return new ResponseEntity<>(cartMenu, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid CartMenu cartMenu) throws Exception {
        cartMenu = service.create(cartMenu);
        logger.info("Created new cartMenu with id = " + cartMenu.getId());
        return new ResponseEntity<>(cartMenu, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted cartMenu with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

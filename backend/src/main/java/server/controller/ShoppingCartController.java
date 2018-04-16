package server.controller;

import server.entity.ShoppingCart;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.ShoppingCartService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/shopping_carts")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        ShoppingCart shoppingCart = service.findById(id);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid ShoppingCart shoppingCart) throws Exception {
        shoppingCart = service.create(shoppingCart);
        logger.info("Created new shoppingCart with id = " + shoppingCart.getId());
        return new ResponseEntity<>(shoppingCart, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted shoppingCart with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

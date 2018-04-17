package server.controller;

import server.entity.UserOrder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.UserOrderService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/user_orders")
public class UserOrderController {

    @Autowired
    private UserOrderService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        UserOrder order = service.findById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid UserOrder order) throws Exception {
        order = service.create(order);
        logger.info("Created new order with id = " + order.getId());
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}

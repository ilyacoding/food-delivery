package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.SupplierProfile;
import server.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.SupplierProfileService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/supplier_profiles")
public class SupplierProfileController {

    @Autowired
    private SupplierProfileService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index(Pageable pageable) throws Exception {
        Iterable<SupplierProfile> list = service.findAll(pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        SupplierProfile supplierProfile = service.findById(id);
        return new ResponseEntity<>(supplierProfile, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid SupplierProfile supplierProfile) throws Exception {
        supplierProfile = service.create(supplierProfile);
        logger.info("Created new supplierProfile with id = " + supplierProfile.getId());
        return new ResponseEntity<>(supplierProfile, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody SupplierProfile supplierProfile) throws Exception {
        supplierProfile = service.update(id, supplierProfile);
        logger.info("Updated supplierProfile with id = " + id);
        return new ResponseEntity<>(supplierProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted supplierProfile with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

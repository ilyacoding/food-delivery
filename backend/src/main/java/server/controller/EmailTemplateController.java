package server.controller;

import org.springframework.data.domain.Pageable;
import server.entity.EmailTemplate;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.service.EmailTemplateService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/email_templates")
public class EmailTemplateController {

    @Autowired
    private EmailTemplateService service;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity index() throws Exception {
        Iterable<EmailTemplate> list = service.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity show(@PathVariable Long id) throws Exception {
        EmailTemplate emailTemplate = service.findById(id);
        return new ResponseEntity<>(emailTemplate, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid EmailTemplate emailTemplate) throws Exception {
        emailTemplate = service.create(emailTemplate);
        logger.info("Created new emailTemplate with id = " + emailTemplate.getId());
        return new ResponseEntity<>(emailTemplate, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody EmailTemplate emailTemplate) throws Exception {
        emailTemplate = service.update(id, emailTemplate);
        logger.info("Updated emailTemplate with id = " + id);
        return new ResponseEntity<>(emailTemplate, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        logger.info("Deleted emailTemplate with id = " + id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

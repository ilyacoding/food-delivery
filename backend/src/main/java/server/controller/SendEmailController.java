package server.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.entity.Email;
import server.service.EmailService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/send_email")
public class SendEmailController {

    @Autowired
    private EmailService emailService;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid Email email) throws Exception {
        emailService.send(email);
        logger.info("Sent email with subject: " + email.getSubject());
        return new ResponseEntity(HttpStatus.OK);
    }
}

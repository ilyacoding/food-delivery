package server.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import server.entity.Email;
import server.entity.User;
import server.repository.UserRepository;

import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmailService {
    private String EMAIL_FROM = "food.delivery.corp@yandex.ru";
    private String ADMIN_EMAIL = "ilyacoding@yandex.ru";

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private UserRepository userRepository;

    private final static Logger logger = LogManager.getLogger(UserService.class);

    @Async
    public void send(Email email) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(EMAIL_FROM);
        helper.setTo(getEmails(email.getUsers()));
        helper.setText(email.getText());
        helper.setSubject(email.getSubject());

        try {
            sender.send(message);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    @Async
    public void sendToAdmin(Email email) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(EMAIL_FROM);
        helper.setTo(ADMIN_EMAIL);
        helper.setText(email.getText());
        helper.setSubject(email.getSubject());

        try {
            sender.send(message);
        } catch (Exception exception) {
            logger.error(exception.getMessage());
            throw exception;
        }
    }

    private String[] getEmails(Set<User> userSet) {
        List<String> emails = new ArrayList<>();

        for (User user : userSet) {
            Optional<User> dbUser = userRepository.findById(user.getId());
            dbUser.ifPresent(user1 -> emails.add(user1.getEmail()));
        }

        return emails.toArray(new String[0]);
    }
}

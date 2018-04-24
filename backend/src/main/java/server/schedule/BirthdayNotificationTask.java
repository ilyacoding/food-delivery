package server.schedule;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import server.entity.Email;
import server.entity.User;
import server.service.EmailService;
import server.service.UserService;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class BirthdayNotificationTask {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Scheduled(cron = "0 0 9 * * *" )
    public void sendBirthdayNotification() throws Exception {
        LocalDate localDate = LocalDate.now();

        Set<User> users = userService.findByBirthday(localDate);

        if (!users.isEmpty()) {
            Email email = new Email();
            email.setSubject("Birthday notification");
            email.setText(buildText(localDate, users));

            logger.info("Sent birthday notification to admin");

            emailService.sendToAdmin(email);
        }
    }

    private String buildText(LocalDate localDate, Set<User> users) {
        StringBuilder text = new StringBuilder();
        text.append("Today ").append(localDate.toString()).append(" birthdays: ")
                .append(String.join(", ", users.stream().map(User::getEmail).collect(Collectors.toList())));

        return text.toString();
    }
}

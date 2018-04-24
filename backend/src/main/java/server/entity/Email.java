package server.entity;

import lombok.Data;

import java.util.Set;

@Data
public class Email {

    private String subject;

    private String text;

    private Set<User> users;
}

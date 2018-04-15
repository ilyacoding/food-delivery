package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Role {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    private Set<User> users;

    public String getName() {
        return "ROLE_" + this.name;
    }
}

package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Category {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true)
    private String name;

    @Column
    private String description;

    @OneToMany(mappedBy = "category")
    private Set<Menu> menus;
}

package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Menu {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private String name;

    @Column
    private Integer price;

    @Column
    private Integer description;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "menu")
    private Set<CartMenu> cartMenus;
}

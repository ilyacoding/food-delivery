package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class ShoppingCart {
    @Id
    @GeneratedValue
    private long id;

    @OneToMany(mappedBy = "shoppingCart")
    private Set<CartMenu> cartMenus;

    @ManyToOne
    private User user;
}

package server.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    @NotBlank
    private String email;

    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users")
    private Set<Role> roles;

    @OneToOne
    @JoinColumn
    private SupplierProfile supplierProfile;

    @OneToMany(mappedBy = "user")
    private Set<Meal> meals;

    @OneToMany(mappedBy = "user")
    private Set<UserOrder> userOrders;

    @OneToMany(mappedBy = "user")
    private Set<ShoppingCart> shoppingCarts;
}

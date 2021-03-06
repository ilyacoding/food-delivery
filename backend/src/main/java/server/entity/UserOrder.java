package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class UserOrder {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private Integer price;

    @Column
    private LocalDateTime deliverTime;

    @Column
    private String addressLine1;

    @Column
    private String addressLine2;

    @ManyToOne
    private User user;

    @OneToOne
    @JoinColumn
    private ShoppingCart shoppingCart;
}

package server.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class CartMenu {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Menu menu;

    @ManyToOne
    private DurationTime durationTime;

    @ManyToOne
    private ShoppingCart shoppingCart;
}

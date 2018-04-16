package server.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Meal {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private String name;

    @Column
    private String fats;

    @Column
    private String mass;

    @Column
    private String proteins;

    @Column
    private String carbohydrates;

    @Column
    private Integer supplier_price;

    @ManyToOne
    private User user;
}

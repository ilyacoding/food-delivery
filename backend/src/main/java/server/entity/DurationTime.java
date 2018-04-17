package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class DurationTime {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true)
    private Integer daysAmount;

    @Column
    private Integer discountCoefficient;

    @OneToMany(mappedBy = "durationTime")
    private Set<CartMenu> cartMenus;
}

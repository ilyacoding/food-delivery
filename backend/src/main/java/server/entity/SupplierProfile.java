package server.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class SupplierProfile {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private String website;

    @Column
    private String logoImageUrl;

    @Column
    private String fax;

    @Column
    private String zip;

    @Column
    private String address;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String country;

    @Column
    private String description;

    @OneToOne(mappedBy = "supplierProfile")
    private User user;
}

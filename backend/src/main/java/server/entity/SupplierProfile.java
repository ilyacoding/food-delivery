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

    @Column(length = 30)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

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

    @Column(length = 40)
    private String city;

    @Column(length = 40)
    private String state;

    @Column
    private String country;

    @Column(length = 1000)
    private String description;
}

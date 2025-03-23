package com.example.realestate.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "properties")
@Data
public class PropertyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name = "property_id")
    private Long propertyID;
    @Column(name = "name", columnDefinition = "nvarchar(255)")
    private String name;
    @Column(name = "location", columnDefinition = "nvarchar(255)")
    private String location;
    @Column(name = "price", columnDefinition = "nvarchar(255)")
    private String price;
    @Column(name = "size", columnDefinition = "nvarchar(255)")
    private String size;
    @Column(name = "image_url", columnDefinition = "nvarchar(255)")
    private String imageURL;
    @Column(name = "description", columnDefinition = "nvarchar(1000)")
    private String description;
}

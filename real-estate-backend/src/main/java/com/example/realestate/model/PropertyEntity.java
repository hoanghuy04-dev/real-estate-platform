package com.example.realestate.model;

import com.example.realestate.model.enums.PropertyTypeEnum;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "nvarchar(50)")
    private PropertyTypeEnum type;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity author;
}

package com.example.realestate.controller;

import com.example.realestate.model.PropertyEntity;
import com.example.realestate.service.PropertyService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostConstruct
    public void init() {
        propertyService.initSampleData();
    }

    @GetMapping("/properties")
    public List<PropertyEntity> getAllProperties() {
        return propertyService.searchProperties(null);
    }

    @GetMapping("/properties/search")
    public List<PropertyEntity> searchProperties(@RequestParam(value = "location", required = false) String location) {
        return propertyService.searchProperties(location);
    }

    @GetMapping("/properties/{id}")
    public PropertyEntity getPropertyById(@PathVariable Long id) {
        PropertyEntity property = propertyService.getPropertyById(id);
        if (property == null) {
            throw new RuntimeException("Property not found with id: " + id);
        }
        return property;
    }

}

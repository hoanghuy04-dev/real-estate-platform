package com.example.realestate.controller;

import com.example.realestate.model.PropertyEntity;
import com.example.realestate.service.PropertyService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/properties/search")
    public List<PropertyEntity> searchProperties(@RequestParam(value = "location", required = false) String location) {
        return propertyService.searchLocation(location);
    }

}

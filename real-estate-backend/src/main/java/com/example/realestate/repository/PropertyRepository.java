package com.example.realestate.repository;

import com.example.realestate.model.PropertyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<PropertyEntity, Long> {
    List<PropertyEntity> findByLocationContainingIgnoreCase(String location);
}
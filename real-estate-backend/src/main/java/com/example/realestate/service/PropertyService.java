package com.example.realestate.service;

import com.example.realestate.model.PropertyEntity;
import com.example.realestate.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<PropertyEntity> searchLocation(String location) {
        if(location == null)
            return propertyRepository.findAll();

        if(location.trim().isEmpty())
            return propertyRepository.findAll();

        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }

    // Thêm dữ liệu mẫu (chạy lần đầu)
    public void initSampleData() {
        if (propertyRepository.count() == 0) {
            PropertyEntity p1 = new PropertyEntity();
            p1.setName("Nhà 3 tầng");
            p1.setLocation("Hà Nội");
            p1.setPrice("5 tỷ VND");
            p1.setSize("120m²");
            p1.setImageURL("https://picsum.photos/300/200?random=1");

            PropertyEntity p2 = new PropertyEntity();
            p2.setName("Căn hộ cao cấp");
            p2.setLocation("TP.HCM");
            p2.setPrice("2.5 tỷ VND");
            p2.setSize("80m²");
            p2.setImageURL("https://picsum.photos/300/200?random=2");

            PropertyEntity p3 = new PropertyEntity();
            p3.setName("Biệt thự");
            p3.setLocation("Đà Nẵng");
            p3.setPrice("10 tỷ VND");
            p3.setSize("200m²");
            p3.setImageURL("https://picsum.photos/300/200?random=3");

            propertyRepository.saveAll(List.of(p1, p2, p3));
        }
    }

}

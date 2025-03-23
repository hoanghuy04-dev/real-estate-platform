package com.example.realestate.service;

import com.example.realestate.model.PropertyEntity;
import com.example.realestate.model.UserEntity;
import com.example.realestate.model.enums.PropertyTypeEnum;
import com.example.realestate.repository.PropertyRepository;
import com.example.realestate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PropertyEntity> searchProperties(String location) {
        if (location == null)
            return propertyRepository.findAll();

        if (location.trim().isEmpty())
            return propertyRepository.findAll();

        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }

    public PropertyEntity getPropertyById(Long propertyId) {
        Optional<PropertyEntity> property = propertyRepository.findById(propertyId);
        return property.orElse(null);
    }

    // Thêm dữ liệu mẫu (chạy lần đầu)
    public void initPropertiesData() {
        List<UserEntity> list = userRepository.findAll();

        if (propertyRepository.count() == 0) {
            PropertyEntity p1 = new PropertyEntity();
            p1.setName("Nhà 3 tầng");
            p1.setLocation("Hà Nội");
            p1.setPrice("5 tỷ VND");
            p1.setSize("120m²");
            p1.setImageURL("https://picsum.photos/300/200?random=1");
            p1.setDescription("Nhà 3 tầng mới xây, thiết kế hiện đại, đầy đủ tiện nghi, gần trung tâm Hà Nội. Phù hợp cho gia đình 4-5 người.");
            p1.setAuthor(list.get(0));
            p1.setType(PropertyTypeEnum.HOUSE);

            PropertyEntity p2 = new PropertyEntity();
            p2.setName("Căn hộ cao cấp");
            p2.setLocation("TP.HCM");
            p2.setPrice("2.5 tỷ VND");
            p2.setSize("80m²");
            p2.setImageURL("https://picsum.photos/300/200?random=2");
            p2.setDescription("Căn hộ cao cấp tại trung tâm TP.HCM, view sông Sài Gòn, nội thất sang trọng, an ninh 24/7.");
            p2.setAuthor(list.get(1));
            p2.setType(PropertyTypeEnum.APARTMENT);

            PropertyEntity p3 = new PropertyEntity();
            p3.setName("Biệt thự");
            p3.setLocation("Đà Nẵng");
            p3.setPrice("10 tỷ VND");
            p3.setSize("200m²");
            p3.setImageURL("https://picsum.photos/300/200?random=3");
            p3.setDescription("Biệt thự ven biển Đà Nẵng, không gian thoáng đãng, có hồ bơi riêng, lý tưởng để nghỉ dưỡng.");
            p3.setAuthor(list.get(2));
            p3.setType(PropertyTypeEnum.VILLA);

            propertyRepository.saveAll(List.of(p1, p2, p3));
        }
    }
}

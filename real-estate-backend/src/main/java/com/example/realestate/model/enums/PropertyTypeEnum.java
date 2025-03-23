package com.example.realestate.model.enums;

public enum PropertyTypeEnum {
    HOUSE("Nhà"),
    APARTMENT("Căn hộ"),
    VILLA("Biệt thự");

    private final String displayName;

    PropertyTypeEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

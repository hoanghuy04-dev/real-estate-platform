package com.example.realestate.util;

public class EnumConverterUtil {
    public static <E extends Enum<E>> E convertToEnum(Class<E> enumClass, String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }

        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public static <E extends Enum<E>> String convertToString(E enumValue) {
        if (enumValue == null) {
            return null;
        }
        return enumValue.name();
    }
}

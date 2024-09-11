package com.haianh123bg.elearn_programming.utils;

import java.security.SecureRandom;

public class GenericCode {
    private static final String CHAR_POOL = "yq2AHXl8bmEOR7kjGxvWoDfpZ5rL6Nsa0UIQt9cC1B3K7VJYdTgzeP4nFw";
    private static final String NUMBER_POOL = "01234567890";
    private static final SecureRandom RANDOM = new SecureRandom();

    // Phương thức chung để sinh mã ngẫu nhiên từ một chuỗi ký tự bất kỳ
    private static String generateRandomCode(String pool, int size) {
        if (size <= 0) {
            throw new IllegalArgumentException("Size must be a positive integer");
        }

        StringBuilder code = new StringBuilder(size);
        int length = pool.length();

        for (int i = 0; i < size; i++) {
            int index = RANDOM.nextInt(length);
            code.append(pool.charAt(index));
        }

        return code.toString();
    }

    // Sinh mã xác minh từ chuỗi ký tự
    public static String generateCodeWithSize(int size) {
        return generateRandomCode(CHAR_POOL, size);
    }

    // Sinh mã xác minh chỉ với số
    public static String generateCodeWithNumbersOnly(int size) {
        return generateRandomCode(NUMBER_POOL, size);
    }

    public static void main(String[] args) {
        System.out.println(generateCodeWithSize(10));       // Ví dụ sinh mã với ký tự
        System.out.println(generateCodeWithNumbersOnly(6)); // Ví dụ sinh mã chỉ có số
    }
}

package com.haianh123bg.elearn_programming.utils;

import java.util.Arrays;
import java.util.List;

public class MimeTypeUtils {
    public static List<String> getAllowedMimeType() {
        return Arrays.asList("application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
    }
}

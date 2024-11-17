package com.haianh123bg.elearn_programming.service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

public interface RedisService {
    void saveData(String key, Object value);
    Object getData(String key);
    void saveDataWithTTL(String key, Object value, long timeout, TimeUnit unit);
    Set<String> getAllKeysWithPrefix(String prefix);
}

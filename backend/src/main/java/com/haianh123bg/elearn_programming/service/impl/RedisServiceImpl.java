package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void saveData(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void saveDataWithTTL(String key, Object value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }

    @Override
    public Set<String> getAllKeysWithPrefix(String prefix) {
        return Set.of();
    }
}

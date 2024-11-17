package com.haianh123bg.elearn_programming.service.async;

import com.haianh123bg.elearn_programming.entity.Item;
import com.haianh123bg.elearn_programming.entity.Module;
import com.haianh123bg.elearn_programming.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceAsync {
    private final ItemRepository itemRepository;

    @Async
    @Transactional
    public void updateItemOrder(Integer moduleId, Integer startingOrder) {
        List<Item> items = itemRepository.findByModuleIdAndOrderGreaterThan(moduleId, startingOrder);

        for (Item item : items) {
            item.setOrder(item.getOrder() + 1);
            itemRepository.save(item);
        }
    }
}

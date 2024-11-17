package com.haianh123bg.elearn_programming.service.async;

import com.haianh123bg.elearn_programming.entity.Module;
import com.haianh123bg.elearn_programming.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModuleServiceAsync {
    private final ModuleRepository moduleRepository;

    @Async
    @Transactional
    public void updateModuleOrder(Integer courseId, Integer startingOrder) {
        List<Module> modules = moduleRepository.findByCourseIdAndOrderGreaterThan(courseId, startingOrder);

        for (Module module : modules) {
            module.setOrder(module.getOrder() + 1);
            moduleRepository.save(module);
        }
    }
}

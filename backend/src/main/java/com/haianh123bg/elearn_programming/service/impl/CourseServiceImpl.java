package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.CreateCourseRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateItemRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateModuleRequest;
import com.haianh123bg.elearn_programming.dto.response.*;
import com.haianh123bg.elearn_programming.entity.*;
import com.haianh123bg.elearn_programming.entity.Module;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.mapper.CourseMapper;
import com.haianh123bg.elearn_programming.mapper.ItemMapper;
import com.haianh123bg.elearn_programming.mapper_mapstruct.CourseMapperMapstruct;
import com.haianh123bg.elearn_programming.repository.*;
import com.haianh123bg.elearn_programming.service.CourseService;
import com.haianh123bg.elearn_programming.service.async.ItemServiceAsync;
import com.haianh123bg.elearn_programming.service.async.ModuleServiceAsync;
import com.haianh123bg.elearn_programming.specification.CourseSpecification;
import com.haianh123bg.elearn_programming.utils.TypeItemEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final CourseMapperMapstruct courseMapperMapstruct;
    private final ModuleRepository moduleRepository;
    private final ModuleServiceAsync moduleServiceAsync;
    private final ItemRepository itemRepository;
    private final ItemServiceAsync itemServiceAsync;
    private final BlogRepository blogRepository;
    private final CodingExerciseRepository codingExerciseRepository;

    @Override
    public PageResponse<CourseResponse> getPageCourses(
            Integer pageNo,
            Integer pageSize,
            String searchKey
    ) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        Page<Course> page = courseRepository.findPageCourse(searchKey, pageable);

        List<CourseResponse> contentResponse = page.getContent().stream().map(
                courseMapperMapstruct::toCourseResponse).toList();

        return PageResponse.<CourseResponse>builder()
                .pageNo(pageNo)
                .pageSize(page.getSize())
                .last(page.isLast())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .content(contentResponse)
                .build();
    }

    @Override
    public CourseCategoryResponse getCategoryOfCourse(Integer courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXIST)
        );

        AtomicInteger moduleIndex = new AtomicInteger(1);
        AtomicInteger itemIndex = new AtomicInteger(1); // Đánh số thứ tự cho toàn bộ Item

        // Sắp xếp và đánh số thứ tự cho các Module và Item
        List<ModuleResponse> modulesResponse = course.getModules().stream()
                .sorted(Comparator.comparing(Module::getOrder)) // Sắp xếp Module
                .map((module) -> {

                    // Sắp xếp và đánh số thứ tự cho các Item (liên tục từ 1 đến hết)
                    List<ItemResponse> itemsResponse = module.getItems().stream()
                            .sorted(Comparator.comparing(Item::getOrder)) // Sắp xếp Item
                            .map((item) -> ItemResponse.builder()
                                    .itemId(item.getId())
                                    .itemName(item.getTitle())
                                    .index(itemIndex.getAndIncrement()) // Đánh số thứ tự toàn bộ Item liên tục
                                    .build()
                            ).toList();

                    return ModuleResponse.builder()
                            .moduleId(module.getId())
                            .moduleName(module.getName())
                            .index(moduleIndex.getAndIncrement()) // Đánh số thứ tự cho Module
                            .items(itemsResponse)
                            .build();
                }).toList();

        return CourseCategoryResponse.builder()
                .courseId(courseId)
                .courseName(course.getName())
                .modules(modulesResponse)
                .build();
    }

    @Override
    public LessionDetailsResponse getLessionDetails(Integer courseId, Integer itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(
                () -> new AppException(ErrorCode.ITEM_NOT_FOUND)
        );

        TypeItemEnum type = TypeItemEnum.valueOf(item.getType());
        switch (type) {
            case BLOG -> {
                Blog blog = item.getBlog();
                return ItemMapper.toLessionBlogResponse(item, blog);
            }
            case CODING_EXERCISE -> {
                CodingExercise codingExercise = item.getCodingExercise();
                return ItemMapper.toLessionCodingExercise(item, codingExercise);
            }
            case CHOICE_EXERCISES -> {
                List<ChoiceExercises> choiceExercises = item.getChoiceExercises();
                return ItemMapper.toChoiceExercisesResponse(item, choiceExercises);
            }
            case VIDEO_LECTURE -> {
                VideoLecture videoLecture = item.getVideoLecture();
                return ItemMapper.toLessionVideoLectureResponse(item, videoLecture);
            }
            default -> {
                throw new AppException(ErrorCode.TYPE_ITEM_INVALID);
            }
        }
    }

    @Override
    public PageResponse<CourseResponse> getPageCoursesByTeacher(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            String sortDir,
            String searchKey,
            LocalDateTime begin,
            LocalDateTime end) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());
        // Tạo specification
        Specification<Course> spec = Specification.where(
                CourseSpecification.hasTeacherId(userId)
                        .and(CourseSpecification.hasSearchKey(searchKey))
                        .and(CourseSpecification.isActiveBetween(begin, end))
        );

        // Tạo sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);

        Page<Course> pageCourses = courseRepository.findAll(spec, pageable);

        List<CourseResponse> content = pageCourses.getContent().stream().map(
                courseMapperMapstruct::toCourseResponse
        ).toList();
        return PageResponse.<CourseResponse>builder()
                .pageNo(pageNo)
                .pageSize(pageCourses.getSize())
                .totalPages(pageCourses.getTotalPages())
                .totalElements(pageCourses.getTotalElements())
                .last(pageCourses.isLast())
                .content(content)
                .build();
    }

    @Override
    public Integer createCourse(CreateCourseRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        Category category;
        if (request.getCategoryId() == null) {
            category = categoryRepository.save(Category.builder()
                    .name(request.getCategoryName())
                    .build());
        } else {
            category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                    () -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)
            );
        }

        Course course = CourseMapper.toCourse(request, userId, category);

        return courseRepository.save(course).getCourseId();
    }

    @Override
    public Integer createModule(Integer courseId, CreateModuleRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_FOUND)
        );

        if (!Objects.equals(course.getTeacherId(), userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // Kiểm tra xem thứ tự đã tồn tại chưa
        if (moduleRepository.existsByCourseIdAndOrder(courseId, request.getOrder())) {
            // Nếu thứ tự đã tồn tại, tăng thứ tự các module phía sau
            moduleServiceAsync.updateModuleOrder(courseId, request.getOrder());
        }

        Module module = Module.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .course(course)
                .order(request.getOrder())
                .build();


        return moduleRepository.save(module).getId();
    }

    @Override
    public Long createItem(Integer moduleId, CreateItemRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        Module module = moduleRepository.findById(moduleId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_FOUND)
        );

        Course course = module.getCourse();

        if (!Objects.equals(course.getTeacherId(), userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // Kiểm tra xem thứ tự đã tồn tại chưa
        if (itemRepository.existsByModuleIdAndOrder(moduleId, request.getOrder())) {
            // Nếu thứ tự đã tồn tại, tăng thứ tự các module phía sau
            itemServiceAsync.updateItemOrder(moduleId, request.getOrder());
        }

        Item item = Item.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .type(request.getType().name())
                .module(module)
                .order(request.getOrder())
                .build();

        itemRepository.save(item);
        switch (request.getType()) {
            case BLOG -> {
                Blog blog = Blog.builder()
                        .item(item)
                        .content(request.getContent())
                        .build();
                blogRepository.save(blog);
            }
            case VIDEO_LECTURE -> {
                VideoLecture videoLecture = VideoLecture.builder()
                        .url(request.getUrl())
                        .build();
            }
            case CODING_EXERCISE -> {
                CodingExercise codingExercise = CodingExercise.builder()
                        .url(request.getUrl())
                        .build();
                codingExerciseRepository.save(codingExercise);
            }
            case CHOICE_EXERCISES -> {}
            default -> {
                throw new AppException(ErrorCode.TYPE_ITEM_INVALID);
            }
        }
        return item.getId();
    }
}

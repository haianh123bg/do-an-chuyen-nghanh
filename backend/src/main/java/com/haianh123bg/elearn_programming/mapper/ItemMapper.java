package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.response.*;
import com.haianh123bg.elearn_programming.entity.*;

import java.util.List;

public class ItemMapper {
    public static LessionBlogResponse toLessionBlogResponse(Item item, Blog blog) {
        return LessionBlogResponse.builder()
                .itemId(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .type(item.getType())
                //
                .content(blog.getContent())
                .build();
    }

    public static LessionVideoLectureResponse toLessionVideoLectureResponse(Item item, VideoLecture videoLecture) {
        return LessionVideoLectureResponse.builder()
                .itemId(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .type(item.getType())
                //
                .videoUrl(videoLecture.getUrl())
                .build();
    }

    public static LessionCodingExerciseResponse toLessionCodingExercise(Item item, CodingExercise codingExercise) {
        return LessionCodingExerciseResponse.builder()
                .itemId(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .type(item.getType())
                //
                .url(codingExercise.getUrl())
                .build();
    }

    public static LessionChoiseExercisesResponse toChoiceExercisesResponse(Item item, List<ChoiceExercises> choiceExercises) {
        List<ChoiseExercisesResponse> choiseExercisesResponses = choiceExercises.stream().map(
                (choice) -> ChoiseExercisesResponse.builder()
                        .id(choice.getId())
                        .answers(choice.getAnswers().stream().map(
                                        (answer) -> AnswerResponse.builder()
                                                .id(answer.getId())
                                                .isCorrect(answer.getIsCorrect())
                                                .content(answer.getContent())
                                                .build()
                                ).toList()
                        )
                        .difficulty(choice.getDifficulty())
                        .content(choice.getDifficulty())
                        .build()
        ).toList();
        return LessionChoiseExercisesResponse.builder()
                .itemId(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .type(item.getType())
                //
                .questions(choiseExercisesResponses)
                .size(choiseExercisesResponses.size())
                .build();
    }
}

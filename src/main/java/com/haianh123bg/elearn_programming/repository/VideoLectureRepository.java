package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.VideoLecture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoLectureRepository extends JpaRepository<VideoLecture, Integer> {
}
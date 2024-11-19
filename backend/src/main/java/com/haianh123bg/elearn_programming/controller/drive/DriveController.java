package com.haianh123bg.elearn_programming.controller.drive;

import com.google.api.services.drive.model.File;
import com.haianh123bg.elearn_programming.entity.Files;
import com.haianh123bg.elearn_programming.repository.FilesRepository;
import com.haianh123bg.elearn_programming.repository.client.google.GoogleClient;
import com.haianh123bg.elearn_programming.service.client.drive.FilesAPI;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/drive")
@RequiredArgsConstructor
public class DriveController {
    private final FilesAPI filesAPI;
    private final FilesRepository filesRepository;

    @GetMapping("/id/list-file")
    public List<Files> idListFile() throws IOException {

        List<File> fileList = filesAPI.listFiles();
        try {
            List<Files> files = fileList.stream().map(
                    (file) -> Files.builder()
                            .fileId(file.getId())
                            .name(file.getName())
                            .build()
            ).toList();
            return filesRepository.saveAll(files);
        } catch (Exception e) {
            throw new IOException(e.getMessage());
        }
    }

    @GetMapping("/")
    public List<File> listSharedFiles() throws IOException {
        return filesAPI.listSharedFiles();
    }
}

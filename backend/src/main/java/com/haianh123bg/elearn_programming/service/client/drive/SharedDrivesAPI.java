package com.haianh123bg.elearn_programming.service.client.drive;

import com.google.api.services.drive.Drive;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SharedDrivesAPI {
    private final Drive driveService;
}

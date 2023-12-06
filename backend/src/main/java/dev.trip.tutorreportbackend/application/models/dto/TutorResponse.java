package dev.trip.tutorreportbackend.application.models.dto;

import java.util.List;

public record TutorResponse(
        String firstName,
        String lastName,
        String email,
        List<ReportResponse> reports
) {
}

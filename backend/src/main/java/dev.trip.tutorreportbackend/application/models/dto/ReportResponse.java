package dev.trip.tutorreportbackend.application.models.dto;

import java.time.LocalDate;

public record ReportResponse(
        int id,
        String tutorEmail,
        String problem,
        String solution,
        String duration,
        String semester,
        LocalDate date
)
{
}

package dev.trip.tutorreportbackend.application.models.dto;

import dev.trip.tutorreportbackend.application.models.entities.Duration;
import dev.trip.tutorreportbackend.application.models.entities.Education;
import dev.trip.tutorreportbackend.application.models.entities.Semester;


import java.time.LocalDate;

public record ReportRequest(
        String problem,
        String solution,
        Duration duration,
        Semester semester,
        Education education,
        LocalDate date
) {
}

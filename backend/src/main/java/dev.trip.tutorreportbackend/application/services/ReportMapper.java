package dev.trip.tutorreportbackend.application.services;

import dev.trip.tutorreportbackend.application.models.entities.Report;
import dev.trip.tutorreportbackend.application.models.dto.ReportResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ReportMapper implements Function<Report, ReportResponse> {

    @Override
    public ReportResponse apply(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getTutor().getEmail(),
                report.getProblem(),
                report.getSolution(),
                report.getDuration().toString(),
                report.getSemester().toString(),
                report.getEducation().toString(),
                report.getDate()
        );
    }
}

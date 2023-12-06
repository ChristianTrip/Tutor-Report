package dev.trip.tutorreportbackend.application.services;

import dev.trip.tutorreportbackend.application.models.dto.ReportResponse;
import dev.trip.tutorreportbackend.application.models.dto.TutorResponse;
import dev.trip.tutorreportbackend.application.models.entities.Tutor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
public class TutorMapper implements Function<Tutor, TutorResponse> {
    private final ReportMapper reportMapper = new ReportMapper();
    @Override
    public TutorResponse apply(Tutor tutor) {

        List<ReportResponse> reportResponses = tutor.getReports().stream().map(reportMapper).toList();

        return new TutorResponse(
                tutor.getFirstName(),
                tutor.getLastName(),
                tutor.getEmail(),
                reportResponses
        );
    }
}

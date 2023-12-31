package dev.trip.tutorreportbackend.application.services;

import dev.trip.tutorreportbackend.application.models.entities.Report;
import dev.trip.tutorreportbackend.application.models.entities.Tutor;
import dev.trip.tutorreportbackend.application.repositories.TutorRepository;
import dev.trip.tutorreportbackend.application.models.dto.ReportRequest;
import dev.trip.tutorreportbackend.application.models.dto.ReportResponse;
import dev.trip.tutorreportbackend.application.models.entities.Duration;
import dev.trip.tutorreportbackend.application.repositories.ReportRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final TutorRepository tutorRepository;
    private final ReportMapper reportMapper;


    public void addReport(String email, Report report){
        Tutor tutor = tutorRepository.findByEmail(email).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "tutor not found")
        );
        report.setTutor(tutor);
        reportRepository.save(report);
    }

    public void addReport(String userEmail, ReportRequest reportRequest){
        Tutor tutor = tutorRepository.findByEmail(userEmail).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "tutor not found")
        );
        Report report = new Report(
                reportRequest.problem(),
                reportRequest.solution(),
                reportRequest.duration(),
                reportRequest.semester(),
                reportRequest.education(),
                reportRequest.date()
        );
        report.setTutor(tutor);

        reportRepository.save(report);
    }

    public ReportResponse getReport(int id){
        Report report = reportRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "report not found")
        );
        return reportMapper.apply(report);
    }

    public List<ReportResponse> getReports(){
        return reportRepository
                .findAll()
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getAllReportsFromTutor(String email){
        Tutor tutor = tutorRepository.findByEmail(email).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "tutor not found")
        );

        return tutor
                .getReports()
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getAllReportsFromTimePeriod(LocalDate startDate, LocalDate endDate){
        return reportRepository
                .findAllByDateBetween(startDate, endDate)
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getAllReportsFromDate(LocalDate date){
        return reportRepository
                .findAllByDate(date)
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getAllReportsByDuration(Duration duration){
        return reportRepository
                .findAllByDuration(duration)
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> getAllReportsBySemester(String semester){
        return reportRepository
                .findAllBySemester(semester)
                .stream()
                .map(reportMapper)
                .collect(Collectors.toList());
    }

    public void deleteReport(int id){
        reportRepository.deleteById(id);
    }

    public void editReport(int id, ReportRequest reportRequest){
        Report report = reportRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "report not found")
        );
        report.setProblem(reportRequest.problem());
        report.setSolution(reportRequest.solution());
        report.setDuration(reportRequest.duration());
        report.setSemester(reportRequest.semester());
        report.setEducation(reportRequest.education());
        report.setDate(reportRequest.date());

        reportRepository.save(report);
    }

}

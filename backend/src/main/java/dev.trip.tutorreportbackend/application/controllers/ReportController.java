package dev.trip.tutorreportbackend.application.controllers;

import dev.trip.tutorreportbackend.application.models.dto.ReportRequest;
import dev.trip.tutorreportbackend.application.models.dto.ReportResponse;
import dev.trip.tutorreportbackend.application.services.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/reports")
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST
        }
)
public class ReportController {

    private final ReportService reportService;


    @GetMapping("/get/{email}")
    public List<ReportResponse> getAllReportsForTutor(@PathVariable String email){
        return reportService.getAllReportsFromTutor(email);
    }

    @GetMapping("/")
    public List<ReportResponse> getAllReports(){
        return reportService.getReports();
    }

    @PostMapping("/add/{email}")
    public List<ReportResponse> addReport(@PathVariable String email, @RequestBody ReportRequest reportRequest){
        reportService.addReport(email, reportRequest);
        return reportService.getAllReportsFromDate(LocalDate.now().minusDays(14));
    }
}

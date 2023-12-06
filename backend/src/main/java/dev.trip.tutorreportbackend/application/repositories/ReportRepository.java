package dev.trip.tutorreportbackend.application.repositories;

import dev.trip.tutorreportbackend.application.models.entities.Report;
import dev.trip.tutorreportbackend.application.models.entities.Duration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    @Query(
        value = "SELECT * FROM reports WHERE tutor = tutorEmail",
        nativeQuery = true
    )
    List<Optional<Report>> findAllReportsForUser(
            @Param("tutorEmail")String tutorEmail
    );

    List<Report> findAllByDuration(
            Duration duration
    );

    List<Report> findAllBySemester(
            String semester
    );

    List<Report> findAllByDate(
            LocalDate date
    );

    List<Report> findAllByDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );
}

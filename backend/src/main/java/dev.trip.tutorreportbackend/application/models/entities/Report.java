package dev.trip.tutorreportbackend.application.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Table(name = "reports")
@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            unique = true,
            nullable = false,
            updatable = false
    )
    private Integer id;

    @Column(
            name = "problem",
            nullable = false,
            updatable = true,
            columnDefinition = "TEXT"
    )
    private String problem;

    @Column(
            name = "solution",
            nullable = false,
            updatable = true,
            columnDefinition = "TEXT"
    )
    private String solution;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "duration",
            nullable = false,
            updatable = true
    )
    private Duration duration;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "semester",
            nullable = false,
            updatable = true
    )
    private Semester semester;

    @Column(
            name = "course_class_name",
            unique = false,
            nullable = true,
            updatable = true
    )
    private String courseClassName;

    @Column(
            name = "date",
            unique = false,
            nullable = false,
            updatable = true
    )
    private LocalDate date;

    @JoinColumn(
            name = "tutor_email",
            foreignKey = @ForeignKey (name = "fkey_report_user"),
            nullable = false
    )
    @ManyToOne
    private Tutor tutor;


    public Report(String problem, String solution, Duration duration, Semester semester, String courseClassName, LocalDate date) {
        this.problem = problem;
        this.solution = solution;
        this.duration = duration;
        this.semester = semester;
        this.courseClassName = courseClassName;
        this.date = date;
    }
}

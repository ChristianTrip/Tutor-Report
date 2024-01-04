package dev.trip.tutorreportbackend.application.models.entities;

import dev.trip.tutorreportbackend.security.models.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tutor extends User {

    @OneToMany(
            mappedBy = "tutor",
            fetch = FetchType.LAZY
    )
    private List<Report> reports = new ArrayList<>();

    public Tutor(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

}

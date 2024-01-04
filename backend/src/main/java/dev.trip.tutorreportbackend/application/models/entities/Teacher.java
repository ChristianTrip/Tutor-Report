package dev.trip.tutorreportbackend.application.models.entities;

import dev.trip.tutorreportbackend.security.models.entities.User;
import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@Entity
public class Teacher extends User {

    public Teacher(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }
}

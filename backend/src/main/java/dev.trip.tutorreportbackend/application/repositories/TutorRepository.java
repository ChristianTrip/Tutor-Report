package dev.trip.tutorreportbackend.application.repositories;

import dev.trip.tutorreportbackend.application.models.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer> {
    Optional<Tutor> findByEmail(String email);
}

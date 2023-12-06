package dev.trip.tutorreportbackend.application.models.dto;

public record UserRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {
}

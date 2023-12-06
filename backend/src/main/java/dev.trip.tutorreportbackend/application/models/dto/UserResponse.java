package dev.trip.tutorreportbackend.application.models.dto;

public record UserResponse(
        String firstName,
        String lastName,
        String email
) {
}

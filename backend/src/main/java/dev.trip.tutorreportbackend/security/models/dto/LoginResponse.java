package dev.trip.tutorreportbackend.security.models.dto;

import java.util.List;

public record LoginResponse(String email, String token, List<String> roles) {
}

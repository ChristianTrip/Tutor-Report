package dev.trip.tutorreportbackend.security.dto;

import java.util.List;

public record LoginResponse(String email, String token, List<String> roles) {
}

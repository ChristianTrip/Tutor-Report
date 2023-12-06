package dev.trip.tutorreportbackend.application.models.entities;

public enum Semester {
    FIRST("1. semester"),
    SECOND("2. semester"),
    THIRD("3. semester"),
    FOURTH("4. semester"),
    FIFTH("5. semester");

    private final String asText;
    Semester(String asText) {
        this.asText = asText;
    }

    @Override
    public String toString() {
        return this.asText;
    }
}

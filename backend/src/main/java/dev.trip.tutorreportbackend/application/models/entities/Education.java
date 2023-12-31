package dev.trip.tutorreportbackend.application.models.entities;

public enum Education {
    DAT ("Datamatiker"),
    ITA("IT-Arkitektur");

    private final String asText;
    Education(String asText) {
        this.asText = asText;
    }

    @Override
    public String toString() {
        return this.asText;
    }
}

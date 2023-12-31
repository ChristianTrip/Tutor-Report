package dev.trip.tutorreportbackend.application.models.entities;

public enum Duration {
    FIVE_MIN ("5 minuter"),
    TEN_MIN("10 minuter"),
    TWENTY_MIN("20 minuter"),
    HALF_HOUR("30 minuter"),
    FORTY_MIN("40 minuter"),
    FIFTY_MIN("50 minuter"),
    HOUR("60 minuter"),
    OVER_AN_HOUR("Over en time");

    private final String asText;
    Duration(String asText) {
        this.asText = asText;
    }

    @Override
    public String toString() {
        return this.asText;
    }
}

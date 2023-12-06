package dev.trip.tutorreportbackend.application.models.entities;

public enum Duration {
    FIVE_MIN ("5 minutes"),
    TEN_MIN("10 minutes"),
    TWENTY_MIN("20 minutes"),
    HALF_HOUR("30 minutes"),
    FORTY_MIN("40 minutes"),
    FIFTY_MIN("50 minutes"),
    HOUR("60 minutes"),
    OVER_AN_HOUR("Over an hour");

    private final String asText;
    Duration(String asText) {
        this.asText = asText;
    }

    @Override
    public String toString() {
        return this.asText;
    }
}

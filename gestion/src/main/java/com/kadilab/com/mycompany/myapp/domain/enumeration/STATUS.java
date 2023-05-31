package com.kadilab.com.mycompany.myapp.domain.enumeration;

/**
 * The STATUS enumeration.
 */
public enum STATUS {
    PENDING("Attante"),
    SEND("Envoyer");

    private final String value;

    STATUS(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

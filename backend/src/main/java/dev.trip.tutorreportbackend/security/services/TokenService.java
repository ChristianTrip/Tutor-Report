package dev.trip.tutorreportbackend.security.services;

import dev.trip.tutorreportbackend.security.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static java.util.stream.Collectors.joining;

@Service
public class TokenService {

    @Value("${app.token-issuer}")
    private String tokenIssuer;

    @Value("${app.token-expiration}")
    private long tokenExpiration;
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public TokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    public String generateToken(Authentication authentication){

        User user = (User) authentication.getPrincipal();
        System.out.println("------------------------------------------");
        System.out.println("------------------------------------------");
        System.out.println("Principal: " + authentication.getPrincipal());
        System.out.println("Authorities: " + authentication.getAuthorities());
        System.out.println("Name: " + authentication.getName());
        System.out.println("Details: " + authentication.getDetails());
        System.out.println("Credentials: " + authentication.getCredentials());
        System.out.println("is authenticated: " + authentication.isAuthenticated());
        System.out.println("------------------------------------------");
        System.out.println("------------------------------------------");

        Instant currentTime = Instant.now();

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(tokenIssuer)
                .issuedAt(Instant.now())
                .expiresAt(currentTime.plusSeconds(tokenExpiration))
                .subject(user.getEmail())
                .claim("roles", scope)
                .build();

        JwsHeader header = JwsHeader
                .with(() -> JwsAlgorithms.RS256)
                .build();

        String token = jwtEncoder
                .encode(JwtEncoderParameters.from(header, claims))
                .getTokenValue();

        return token;
    }

}
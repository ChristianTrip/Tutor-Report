package dev.trip.tutorreportbackend.security.controllers;

import dev.trip.tutorreportbackend.security.dto.LoginRequest;
import dev.trip.tutorreportbackend.security.dto.LoginResponse;
import dev.trip.tutorreportbackend.security.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/")
    public String currentUserNameSimple() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody LoginRequest userRequest){
        authenticationService.registerUser(userRequest.email(), userRequest.password());
        return userRequest.email()  + " is successfully registered!";
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest userRequest){
        LoginResponse loginResponse = authenticationService.loginUser(userRequest.email(), userRequest.password());
        return ResponseEntity.ok().body(loginResponse);
    }
}
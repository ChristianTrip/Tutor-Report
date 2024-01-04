package dev.trip.tutorreportbackend.security.controllers;

import dev.trip.tutorreportbackend.security.models.dto.LoginRequest;
import dev.trip.tutorreportbackend.security.models.dto.LoginResponse;
import dev.trip.tutorreportbackend.security.services.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = {"http://localhost:3000"},
        methods = {
                RequestMethod.GET,
                RequestMethod.POST
        }
)
public class AuthenticationController {

    private final AuthenticationService authenticationService;


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

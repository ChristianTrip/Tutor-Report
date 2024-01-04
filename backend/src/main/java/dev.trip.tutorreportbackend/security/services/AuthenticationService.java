package dev.trip.tutorreportbackend.security.services;

import dev.trip.tutorreportbackend.security.models.dto.LoginResponse;
import dev.trip.tutorreportbackend.security.models.entities.Role;
import dev.trip.tutorreportbackend.security.models.entities.User;
import dev.trip.tutorreportbackend.security.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;



    public void registerUser(String email, String password){

        String encodedPassword = passwordEncoder.encode(password);
        User newUser = new User(
                "",
                "",
                email,
                encodedPassword,
                false,
                true
        );
        newUser.addRoles(Role.USER);

        userRepository.save(newUser);
    }

    public LoginResponse loginUser(String email, String password) {

        try{
            UsernamePasswordAuthenticationToken uat = new UsernamePasswordAuthenticationToken(email, password);
            System.out.println("UAT: " + uat);
            Authentication authentication = authenticationManager.authenticate(uat);

            String token = tokenService.generateToken(authentication);

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("No user with this username found")
            );
            List<String> rolesForUser = user.getAuthorities().stream().map(Object::toString).toList();

            return new LoginResponse(user.getEmail(), token, rolesForUser);
        }
        catch(AuthenticationException e){
            return new LoginResponse(null, "", null);
        }
    }

}

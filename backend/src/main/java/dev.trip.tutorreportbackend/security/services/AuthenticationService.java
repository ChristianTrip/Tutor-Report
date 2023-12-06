package dev.trip.tutorreportbackend.security.services;

import dev.trip.tutorreportbackend.security.dto.LoginResponse;
import dev.trip.tutorreportbackend.security.entities.Role;
import dev.trip.tutorreportbackend.security.entities.User;
import dev.trip.tutorreportbackend.security.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, AuthenticationManager authenticationManager, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

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

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);

        try{
            UsernamePasswordAuthenticationToken uat = new UsernamePasswordAuthenticationToken(email, password);
            System.out.println("UAT: " + uat);
            Authentication authentication = authenticationManager.authenticate(uat);

            System.out.println("++++++++++++++++++++++++++++++++++");
            System.out.println("++++++++++++++++++++++++++++++++++");
            System.out.println("++++++++++++++++++++++++++++++++++");

            String token = tokenService.generateToken(authentication);

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("No user with this username found")
            );
            List<String> rolesForUser = user.getAuthorities().stream().map(Object::toString).toList();

            return new LoginResponse(user.getEmail(), token, rolesForUser);

        }
        catch(AuthenticationException e){

            SecurityContext sc = SecurityContextHolder.getContext();
            //sc.setAuthentication(authentication);
            System.out.println("Security Context: " + sc.getAuthentication());
            return new LoginResponse(null, "", null);
        }
    }

}

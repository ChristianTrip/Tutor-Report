package dev.trip.tutorreportbackend;

import dev.trip.tutorreportbackend.security.entities.Role;
import dev.trip.tutorreportbackend.security.entities.User;
import dev.trip.tutorreportbackend.security.services.AuthenticationService;
import dev.trip.tutorreportbackend.security.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;
import java.util.Set;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = {"dev.trip.tutorreportbackend"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserService userService, AuthenticationService authenticationService){
        return args -> {
            if (false){

                User trip = new User(
                        "Christian",
                        "Trip",
                        "trip@mail.com",
                        "Password1234",
                        false,
                        false
                );


                trip.addRoles(Role.USER, Role.ADMIN);

                userService.addUsers(List.of(trip));
                authenticationService.registerUser(trip.getEmail(), trip.getPassword());

            }
        };

    }
}

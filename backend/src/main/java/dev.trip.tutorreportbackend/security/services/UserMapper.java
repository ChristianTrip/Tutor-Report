package dev.trip.tutorreportbackend.security.services;

import dev.trip.tutorreportbackend.application.models.dto.UserResponse;
import dev.trip.tutorreportbackend.security.entities.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserMapper implements Function<User, UserResponse> {

    @Override
    public UserResponse apply(User user) {
        return new UserResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }
}

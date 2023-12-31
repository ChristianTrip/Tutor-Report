package dev.trip.tutorreportbackend.security.services;

import dev.trip.tutorreportbackend.application.models.dto.UserRequest;
import dev.trip.tutorreportbackend.application.models.dto.UserResponse;
import dev.trip.tutorreportbackend.security.repositories.UserRepository;
import dev.trip.tutorreportbackend.security.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.findByEmail(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException("No user with this username found")
                );
    }

    public void addUsers(List<? extends User> users){
        for (User user: users) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setEnabledAccount(true);
            user.setLockedAccount(false);
        }
        userRepository.saveAll(users);
    }


    public List<UserResponse> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(userMapper)
                .toList();
    }

    public void removeUser(String email){
        userRepository.deleteById(email);
    }

    public UserResponse editUser(UserRequest userRequest){
        User user = userRepository.findByEmail(userRequest.email())
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found")
                );

        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        user.setPassword(userRequest.password());

        return userMapper.apply(userRepository.save(user));
    }

}

package dev.trip.tutorreportbackend.application.controllers;

import dev.trip.tutorreportbackend.application.models.dto.UserRequest;
import dev.trip.tutorreportbackend.application.models.dto.TutorResponse;
import dev.trip.tutorreportbackend.application.models.dto.UserResponse;
import dev.trip.tutorreportbackend.application.services.TutorService;
import dev.trip.tutorreportbackend.security.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.DELETE,
                RequestMethod.PUT
        }
)
public class UserController {

    private final UserService userService;
    private final TutorService tutorService;


    @GetMapping("")
    public List<UserResponse> getAllUsers(){
        return userService.getUsers();
    }

    @GetMapping("/tutors")
    public List<TutorResponse> getAllTutors(){
        return tutorService.getTutors();
    }

    @PutMapping("/user/")
    public UserResponse editUser(@RequestBody UserRequest userRequest){
        return userService.editUser(userRequest);
    }

    @DeleteMapping("/{email}")
    public String deleteUser(@PathVariable String email){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            userService.removeUser(email);
            return "User got deleted";
        }
        return "YOU DONT HAVE THE AUTHORITY TO DELETE A USER";
    }
}

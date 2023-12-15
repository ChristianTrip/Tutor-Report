package dev.trip.tutorreportbackend.application.controllers;

import dev.trip.tutorreportbackend.application.models.dto.UserRequest;
import dev.trip.tutorreportbackend.application.models.dto.TutorResponse;
import dev.trip.tutorreportbackend.application.models.dto.UserResponse;
import dev.trip.tutorreportbackend.application.services.TutorService;
import dev.trip.tutorreportbackend.security.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final TutorService tutorService;

    public UserController(UserService userService, TutorService tutorService) {
        this.userService = userService;
        this.tutorService = tutorService;
    }

    @GetMapping("")
    public List<UserResponse> getAllUsers(){
        return userService.getUsers();
    }

    @GetMapping("/tutors")
    public List<TutorResponse> getAllTutors(){
        return tutorService.getTutors();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/user/")
    public UserResponse editUser(@RequestBody UserRequest userRequest){
        return userService.editUser(userRequest);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{email}")
    public String deleteUser(@PathVariable String email){
        System.out.println("email......................" + email);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            userService.removeUser(email);
            return "User got deleted";
        }
        return "YOU DONT HAVE THE AUTHORITY TO DELETE A USER";
    }
}

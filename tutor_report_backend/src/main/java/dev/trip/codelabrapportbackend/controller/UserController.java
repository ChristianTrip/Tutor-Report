package dev.trip.codelabrapportbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {


    @GetMapping("hello")
    public String getGreeting(){
        return "Hello you..\n Thank you for visiting this website!";
    }

    @GetMapping("users")
    public List<String> getUsers(){
       return getUsersFromDB();
    }


    private List<String> getUsersFromDB(){
        List<String> users = new ArrayList<>();
        String sqlSelectAllPersons = "SELECT * FROM test.users";
        String connectionUrl = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";

        try (Connection conn = DriverManager.getConnection(connectionUrl, "root", "Password1234");
             PreparedStatement ps = conn.prepareStatement(sqlSelectAllPersons);
             ResultSet rs = ps.executeQuery()) {
            System.out.println("prepared statement: " + ps);
            System.out.println("result set: " + rs.toString());
            while (rs.next()) {

                //long id = rs.getLong("id");
                String name = rs.getString("name");
                String password = rs.getString("password");
                String user = "name: " + name + ", password: " + password;
                users.add(user);
                System.out.println("User: " + user);
            }
        } catch (SQLException e) {
            System.out.println("------------------------------------");
            e.printStackTrace();
        }
        return users;
    }
}

package com.medlab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medlab.dto.AuthenticationRequest;
import com.medlab.dto.AuthenticationResponse;
import com.medlab.models.User;
import com.medlab.service.JwtService;
import com.medlab.service.MyUserDetailsService;
import com.medlab.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Return 401 status code
        }

        // Load user details and generate the JWT token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/register-patient")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.userExists(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists"); 
        }

        // Save the new user (this will handle password encoding in the service layer)
        userService.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully"); // Return 201 status code
    }
}

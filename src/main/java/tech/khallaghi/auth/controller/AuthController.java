package tech.khallaghi.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tech.khallaghi.auth.config.JwtUtil;
import tech.khallaghi.auth.dto.AuthDto;
import tech.khallaghi.auth.service.CustomUserDetailsService;
import tech.khallaghi.auth.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDto.Response> register(@RequestBody AuthDto.Request request) {
        String result = userService.registerUser(request.username(), request.password());
        
        if (result.contains("successful")) {
            return ResponseEntity.ok(new AuthDto.Response(true, result, null));
        }
        return ResponseEntity.badRequest().body(new AuthDto.Response(false, result, null));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto.Response> login(@RequestBody AuthDto.Request request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new AuthDto.Response(false, "Invalid username or password", null));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthDto.Response(true, "Login successful", jwt));
    }
}
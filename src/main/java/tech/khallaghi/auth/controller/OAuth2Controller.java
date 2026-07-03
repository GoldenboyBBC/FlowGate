package tech.khallaghi.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.khallaghi.auth.config.JwtUtil;
// import tech.khallaghi.auth.dto.AuthDto;
import tech.khallaghi.auth.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/oauth2")
public class OAuth2Controller {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public OAuth2Controller(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @GetMapping("/success")
    public ResponseEntity<?> loginSuccess(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Generate JWT token
        String token = jwtUtil.generateToken(email);

        // Return response with token
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", email);
        response.put("email", email);
        response.put("name", name);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("email", oAuth2User.getAttribute("email"));
        response.put("name", oAuth2User.getAttribute("name"));
        response.put("picture", oAuth2User.getAttribute("picture"));

        return ResponseEntity.ok(response);
    }
}

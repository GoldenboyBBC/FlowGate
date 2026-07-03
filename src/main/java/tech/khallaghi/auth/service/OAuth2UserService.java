package tech.khallaghi.auth.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import tech.khallaghi.auth.model.User;
import tech.khallaghi.auth.repository.UserRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public OAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String googleId = oAuth2User.getName(); // Google's sub claim
        
        // Find or create user in database
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;
        
        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            // Create new user from OAuth2 information
            user = new User();
            user.setEmail(email);
            user.setUsername(email); // Use email as username
            user.setFullName(name);
            user.setPassword("OAUTH2_USER"); // Placeholder for OAuth2 users
            user.setOauth2Id(googleId);
            userRepository.save(user);
        }
        
        // Create authorities
        Collection<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        
        return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), "email");
    }
}

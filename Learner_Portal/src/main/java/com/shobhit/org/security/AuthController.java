//package com.shobhit.org.security;
//
//import java.util.Map;
//
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.shobhit.org.bean.User;
//import com.shobhit.org.repository.UserRepository;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin("http://127.0.0.1:5500/")
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
//        try {
//            org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.get("email"), loginRequest.get("password"))
//            );
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            User user = userRepository.findByEmail(loginRequest.get("email"))
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//            return ResponseEntity.ok().body(Map.of(
//                "message", "Login successful",
//                "role", user.getRoles()
//            ));
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
//        if (userRepository.existsByEmail(registerRequest.get("email"))) {
//            return ResponseEntity.badRequest().body("Email already in use");
//        }
//
//        User user = new User();
//        user.setEmail(registerRequest.get("email"));
//        user.setPassword(passwordEncoder.encode(registerRequest.get("password")));
//        user.setRoles(registerRequest.get("role").toUpperCase());
//
//        userRepository.save(user);
//
//        return ResponseEntity.ok().body("User registered successfully");
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        SecurityContextHolder.clearContext();
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();
//        }
//        return ResponseEntity.ok().body("Logged out successfully");
//    }
//}

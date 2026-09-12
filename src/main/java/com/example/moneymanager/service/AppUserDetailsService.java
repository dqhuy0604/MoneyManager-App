package com.example.moneymanager.service;

import com.example.moneymanager.entity.ProfileEntity;
import com.example.moneymanager.respository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final ProfileRepository profileRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws RuntimeException {
        ProfileEntity existingUser = profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found with email: " + email));
        return User.builder()
                .username(existingUser.getEmail())
                .password(existingUser.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }

}

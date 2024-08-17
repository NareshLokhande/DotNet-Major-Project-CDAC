package com.medlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medlab.models.RefreshToken;

import java.util.Optional;



public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByToken(String token);
}


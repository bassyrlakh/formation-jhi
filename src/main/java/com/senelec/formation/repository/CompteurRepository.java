package com.senelec.formation.repository;

import com.senelec.formation.domain.Compteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Compteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompteurRepository extends JpaRepository<Compteur, Long> {}

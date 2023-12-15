package com.senelec.formation.repository;

import com.senelec.formation.domain.Compteur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Compteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompteurRepository extends JpaRepository<Compteur, Long> {
    @Query(value = "select * from compteur where numero like ?1%", nativeQuery = true)
    Page<Compteur> findCompteursByNumero(String numero, Pageable p);
}

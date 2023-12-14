package com.senelec.formation.repository;

import com.senelec.formation.domain.Client;
import com.senelec.formation.service.dto.ClientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query(
        "select c from Client c where lower(c.firstName) like lower(concat('%', :query,'%')) or lower(c.lastName) like lower(concat('%', :query,'%'))"
    )
    Page<Client> findAllByLastNameAndFirstNameIgnoreCase(@Param("query") String query, Pageable pageable);
}

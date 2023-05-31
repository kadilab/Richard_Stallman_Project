package com.kadilab.com.mycompany.myapp.repository;

import com.kadilab.com.mycompany.myapp.domain.CommandeFournisseur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CommandeFournisseur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeFournisseurRepository extends JpaRepository<CommandeFournisseur, Long> {}

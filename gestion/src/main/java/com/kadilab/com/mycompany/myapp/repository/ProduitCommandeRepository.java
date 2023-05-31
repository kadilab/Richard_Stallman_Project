package com.kadilab.com.mycompany.myapp.repository;

import com.kadilab.com.mycompany.myapp.domain.ProduitCommande;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ProduitCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduitCommandeRepository extends JpaRepository<ProduitCommande, Long> {}

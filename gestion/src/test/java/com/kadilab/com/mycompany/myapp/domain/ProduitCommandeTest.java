package com.kadilab.com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.kadilab.com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProduitCommandeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProduitCommande.class);
        ProduitCommande produitCommande1 = new ProduitCommande();
        produitCommande1.setId(1L);
        ProduitCommande produitCommande2 = new ProduitCommande();
        produitCommande2.setId(produitCommande1.getId());
        assertThat(produitCommande1).isEqualTo(produitCommande2);
        produitCommande2.setId(2L);
        assertThat(produitCommande1).isNotEqualTo(produitCommande2);
        produitCommande1.setId(null);
        assertThat(produitCommande1).isNotEqualTo(produitCommande2);
    }
}

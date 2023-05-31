package com.kadilab.com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kadilab.com.mycompany.myapp.IntegrationTest;
import com.kadilab.com.mycompany.myapp.domain.LigneCommandeFournisseur;
import com.kadilab.com.mycompany.myapp.repository.LigneCommandeFournisseurRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LigneCommandeFournisseurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LigneCommandeFournisseurResourceIT {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final String ENTITY_API_URL = "/api/ligne-commande-fournisseurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneCommandeFournisseurMockMvc;

    private LigneCommandeFournisseur ligneCommandeFournisseur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCommandeFournisseur createEntity(EntityManager em) {
        LigneCommandeFournisseur ligneCommandeFournisseur = new LigneCommandeFournisseur().quantite(DEFAULT_QUANTITE);
        return ligneCommandeFournisseur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCommandeFournisseur createUpdatedEntity(EntityManager em) {
        LigneCommandeFournisseur ligneCommandeFournisseur = new LigneCommandeFournisseur().quantite(UPDATED_QUANTITE);
        return ligneCommandeFournisseur;
    }

    @BeforeEach
    public void initTest() {
        ligneCommandeFournisseur = createEntity(em);
    }

    @Test
    @Transactional
    void createLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeCreate = ligneCommandeFournisseurRepository.findAll().size();
        // Create the LigneCommandeFournisseur
        restLigneCommandeFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isCreated());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeCreate + 1);
        LigneCommandeFournisseur testLigneCommandeFournisseur = ligneCommandeFournisseurList.get(ligneCommandeFournisseurList.size() - 1);
        assertThat(testLigneCommandeFournisseur.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    void createLigneCommandeFournisseurWithExistingId() throws Exception {
        // Create the LigneCommandeFournisseur with an existing ID
        ligneCommandeFournisseur.setId(1L);

        int databaseSizeBeforeCreate = ligneCommandeFournisseurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneCommandeFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLigneCommandeFournisseurs() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        // Get all the ligneCommandeFournisseurList
        restLigneCommandeFournisseurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneCommandeFournisseur.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }

    @Test
    @Transactional
    void getLigneCommandeFournisseur() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        // Get the ligneCommandeFournisseur
        restLigneCommandeFournisseurMockMvc
            .perform(get(ENTITY_API_URL_ID, ligneCommandeFournisseur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneCommandeFournisseur.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }

    @Test
    @Transactional
    void getNonExistingLigneCommandeFournisseur() throws Exception {
        // Get the ligneCommandeFournisseur
        restLigneCommandeFournisseurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLigneCommandeFournisseur() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();

        // Update the ligneCommandeFournisseur
        LigneCommandeFournisseur updatedLigneCommandeFournisseur = ligneCommandeFournisseurRepository
            .findById(ligneCommandeFournisseur.getId())
            .get();
        // Disconnect from session so that the updates on updatedLigneCommandeFournisseur are not directly saved in db
        em.detach(updatedLigneCommandeFournisseur);
        updatedLigneCommandeFournisseur.quantite(UPDATED_QUANTITE);

        restLigneCommandeFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLigneCommandeFournisseur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLigneCommandeFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCommandeFournisseur testLigneCommandeFournisseur = ligneCommandeFournisseurList.get(ligneCommandeFournisseurList.size() - 1);
        assertThat(testLigneCommandeFournisseur.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    void putNonExistingLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCommandeFournisseur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLigneCommandeFournisseurWithPatch() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();

        // Update the ligneCommandeFournisseur using partial update
        LigneCommandeFournisseur partialUpdatedLigneCommandeFournisseur = new LigneCommandeFournisseur();
        partialUpdatedLigneCommandeFournisseur.setId(ligneCommandeFournisseur.getId());

        restLigneCommandeFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCommandeFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCommandeFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCommandeFournisseur testLigneCommandeFournisseur = ligneCommandeFournisseurList.get(ligneCommandeFournisseurList.size() - 1);
        assertThat(testLigneCommandeFournisseur.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    void fullUpdateLigneCommandeFournisseurWithPatch() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();

        // Update the ligneCommandeFournisseur using partial update
        LigneCommandeFournisseur partialUpdatedLigneCommandeFournisseur = new LigneCommandeFournisseur();
        partialUpdatedLigneCommandeFournisseur.setId(ligneCommandeFournisseur.getId());

        partialUpdatedLigneCommandeFournisseur.quantite(UPDATED_QUANTITE);

        restLigneCommandeFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCommandeFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCommandeFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCommandeFournisseur testLigneCommandeFournisseur = ligneCommandeFournisseurList.get(ligneCommandeFournisseurList.size() - 1);
        assertThat(testLigneCommandeFournisseur.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    void patchNonExistingLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ligneCommandeFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLigneCommandeFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeFournisseurRepository.findAll().size();
        ligneCommandeFournisseur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeFournisseur))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCommandeFournisseur in the database
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLigneCommandeFournisseur() throws Exception {
        // Initialize the database
        ligneCommandeFournisseurRepository.saveAndFlush(ligneCommandeFournisseur);

        int databaseSizeBeforeDelete = ligneCommandeFournisseurRepository.findAll().size();

        // Delete the ligneCommandeFournisseur
        restLigneCommandeFournisseurMockMvc
            .perform(delete(ENTITY_API_URL_ID, ligneCommandeFournisseur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneCommandeFournisseur> ligneCommandeFournisseurList = ligneCommandeFournisseurRepository.findAll();
        assertThat(ligneCommandeFournisseurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

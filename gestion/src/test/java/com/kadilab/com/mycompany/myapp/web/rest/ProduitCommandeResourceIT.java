package com.kadilab.com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kadilab.com.mycompany.myapp.IntegrationTest;
import com.kadilab.com.mycompany.myapp.domain.ProduitCommande;
import com.kadilab.com.mycompany.myapp.repository.ProduitCommandeRepository;
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
 * Integration tests for the {@link ProduitCommandeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProduitCommandeResourceIT {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final String ENTITY_API_URL = "/api/produit-commandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProduitCommandeRepository produitCommandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProduitCommandeMockMvc;

    private ProduitCommande produitCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProduitCommande createEntity(EntityManager em) {
        ProduitCommande produitCommande = new ProduitCommande().quantite(DEFAULT_QUANTITE);
        return produitCommande;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProduitCommande createUpdatedEntity(EntityManager em) {
        ProduitCommande produitCommande = new ProduitCommande().quantite(UPDATED_QUANTITE);
        return produitCommande;
    }

    @BeforeEach
    public void initTest() {
        produitCommande = createEntity(em);
    }

    @Test
    @Transactional
    void createProduitCommande() throws Exception {
        int databaseSizeBeforeCreate = produitCommandeRepository.findAll().size();
        // Create the ProduitCommande
        restProduitCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isCreated());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        ProduitCommande testProduitCommande = produitCommandeList.get(produitCommandeList.size() - 1);
        assertThat(testProduitCommande.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    void createProduitCommandeWithExistingId() throws Exception {
        // Create the ProduitCommande with an existing ID
        produitCommande.setId(1L);

        int databaseSizeBeforeCreate = produitCommandeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduitCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProduitCommandes() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        // Get all the produitCommandeList
        restProduitCommandeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produitCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }

    @Test
    @Transactional
    void getProduitCommande() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        // Get the produitCommande
        restProduitCommandeMockMvc
            .perform(get(ENTITY_API_URL_ID, produitCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produitCommande.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }

    @Test
    @Transactional
    void getNonExistingProduitCommande() throws Exception {
        // Get the produitCommande
        restProduitCommandeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProduitCommande() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();

        // Update the produitCommande
        ProduitCommande updatedProduitCommande = produitCommandeRepository.findById(produitCommande.getId()).get();
        // Disconnect from session so that the updates on updatedProduitCommande are not directly saved in db
        em.detach(updatedProduitCommande);
        updatedProduitCommande.quantite(UPDATED_QUANTITE);

        restProduitCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProduitCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProduitCommande))
            )
            .andExpect(status().isOk());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
        ProduitCommande testProduitCommande = produitCommandeList.get(produitCommandeList.size() - 1);
        assertThat(testProduitCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    void putNonExistingProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, produitCommande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProduitCommandeWithPatch() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();

        // Update the produitCommande using partial update
        ProduitCommande partialUpdatedProduitCommande = new ProduitCommande();
        partialUpdatedProduitCommande.setId(produitCommande.getId());

        partialUpdatedProduitCommande.quantite(UPDATED_QUANTITE);

        restProduitCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProduitCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProduitCommande))
            )
            .andExpect(status().isOk());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
        ProduitCommande testProduitCommande = produitCommandeList.get(produitCommandeList.size() - 1);
        assertThat(testProduitCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    void fullUpdateProduitCommandeWithPatch() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();

        // Update the produitCommande using partial update
        ProduitCommande partialUpdatedProduitCommande = new ProduitCommande();
        partialUpdatedProduitCommande.setId(produitCommande.getId());

        partialUpdatedProduitCommande.quantite(UPDATED_QUANTITE);

        restProduitCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProduitCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProduitCommande))
            )
            .andExpect(status().isOk());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
        ProduitCommande testProduitCommande = produitCommandeList.get(produitCommandeList.size() - 1);
        assertThat(testProduitCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    void patchNonExistingProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, produitCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProduitCommande() throws Exception {
        int databaseSizeBeforeUpdate = produitCommandeRepository.findAll().size();
        produitCommande.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProduitCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(produitCommande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProduitCommande in the database
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProduitCommande() throws Exception {
        // Initialize the database
        produitCommandeRepository.saveAndFlush(produitCommande);

        int databaseSizeBeforeDelete = produitCommandeRepository.findAll().size();

        // Delete the produitCommande
        restProduitCommandeMockMvc
            .perform(delete(ENTITY_API_URL_ID, produitCommande.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProduitCommande> produitCommandeList = produitCommandeRepository.findAll();
        assertThat(produitCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

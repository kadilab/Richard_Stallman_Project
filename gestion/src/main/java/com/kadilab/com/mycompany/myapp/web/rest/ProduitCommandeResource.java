package com.kadilab.com.mycompany.myapp.web.rest;

import com.kadilab.com.mycompany.myapp.domain.ProduitCommande;
import com.kadilab.com.mycompany.myapp.repository.ProduitCommandeRepository;
import com.kadilab.com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.kadilab.com.mycompany.myapp.domain.ProduitCommande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProduitCommandeResource {

    private final Logger log = LoggerFactory.getLogger(ProduitCommandeResource.class);

    private static final String ENTITY_NAME = "produitCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProduitCommandeRepository produitCommandeRepository;

    public ProduitCommandeResource(ProduitCommandeRepository produitCommandeRepository) {
        this.produitCommandeRepository = produitCommandeRepository;
    }

    /**
     * {@code POST  /produit-commandes} : Create a new produitCommande.
     *
     * @param produitCommande the produitCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produitCommande, or with status {@code 400 (Bad Request)} if the produitCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produit-commandes")
    public ResponseEntity<ProduitCommande> createProduitCommande(@RequestBody ProduitCommande produitCommande) throws URISyntaxException {
        log.debug("REST request to save ProduitCommande : {}", produitCommande);
        if (produitCommande.getId() != null) {
            throw new BadRequestAlertException("A new produitCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProduitCommande result = produitCommandeRepository.save(produitCommande);
        return ResponseEntity
            .created(new URI("/api/produit-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produit-commandes/:id} : Updates an existing produitCommande.
     *
     * @param id the id of the produitCommande to save.
     * @param produitCommande the produitCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produitCommande,
     * or with status {@code 400 (Bad Request)} if the produitCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produitCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produit-commandes/{id}")
    public ResponseEntity<ProduitCommande> updateProduitCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProduitCommande produitCommande
    ) throws URISyntaxException {
        log.debug("REST request to update ProduitCommande : {}, {}", id, produitCommande);
        if (produitCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produitCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produitCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProduitCommande result = produitCommandeRepository.save(produitCommande);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, produitCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /produit-commandes/:id} : Partial updates given fields of an existing produitCommande, field will ignore if it is null
     *
     * @param id the id of the produitCommande to save.
     * @param produitCommande the produitCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produitCommande,
     * or with status {@code 400 (Bad Request)} if the produitCommande is not valid,
     * or with status {@code 404 (Not Found)} if the produitCommande is not found,
     * or with status {@code 500 (Internal Server Error)} if the produitCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/produit-commandes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProduitCommande> partialUpdateProduitCommande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ProduitCommande produitCommande
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProduitCommande partially : {}, {}", id, produitCommande);
        if (produitCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produitCommande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produitCommandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProduitCommande> result = produitCommandeRepository
            .findById(produitCommande.getId())
            .map(existingProduitCommande -> {
                if (produitCommande.getQuantite() != null) {
                    existingProduitCommande.setQuantite(produitCommande.getQuantite());
                }

                return existingProduitCommande;
            })
            .map(produitCommandeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, produitCommande.getId().toString())
        );
    }

    /**
     * {@code GET  /produit-commandes} : get all the produitCommandes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produitCommandes in body.
     */
    @GetMapping("/produit-commandes")
    public ResponseEntity<List<ProduitCommande>> getAllProduitCommandes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ProduitCommandes");
        Page<ProduitCommande> page = produitCommandeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /produit-commandes/:id} : get the "id" produitCommande.
     *
     * @param id the id of the produitCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produitCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produit-commandes/{id}")
    public ResponseEntity<ProduitCommande> getProduitCommande(@PathVariable Long id) {
        log.debug("REST request to get ProduitCommande : {}", id);
        Optional<ProduitCommande> produitCommande = produitCommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produitCommande);
    }

    /**
     * {@code DELETE  /produit-commandes/:id} : delete the "id" produitCommande.
     *
     * @param id the id of the produitCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produit-commandes/{id}")
    public ResponseEntity<Void> deleteProduitCommande(@PathVariable Long id) {
        log.debug("REST request to delete ProduitCommande : {}", id);
        produitCommandeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

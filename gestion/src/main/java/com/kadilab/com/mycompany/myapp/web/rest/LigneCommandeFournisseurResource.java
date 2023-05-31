package com.kadilab.com.mycompany.myapp.web.rest;

import com.kadilab.com.mycompany.myapp.domain.LigneCommandeFournisseur;
import com.kadilab.com.mycompany.myapp.repository.LigneCommandeFournisseurRepository;
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
 * REST controller for managing {@link com.kadilab.com.mycompany.myapp.domain.LigneCommandeFournisseur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneCommandeFournisseurResource {

    private final Logger log = LoggerFactory.getLogger(LigneCommandeFournisseurResource.class);

    private static final String ENTITY_NAME = "ligneCommandeFournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository;

    public LigneCommandeFournisseurResource(LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository) {
        this.ligneCommandeFournisseurRepository = ligneCommandeFournisseurRepository;
    }

    /**
     * {@code POST  /ligne-commande-fournisseurs} : Create a new ligneCommandeFournisseur.
     *
     * @param ligneCommandeFournisseur the ligneCommandeFournisseur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneCommandeFournisseur, or with status {@code 400 (Bad Request)} if the ligneCommandeFournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-commande-fournisseurs")
    public ResponseEntity<LigneCommandeFournisseur> createLigneCommandeFournisseur(
        @RequestBody LigneCommandeFournisseur ligneCommandeFournisseur
    ) throws URISyntaxException {
        log.debug("REST request to save LigneCommandeFournisseur : {}", ligneCommandeFournisseur);
        if (ligneCommandeFournisseur.getId() != null) {
            throw new BadRequestAlertException("A new ligneCommandeFournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneCommandeFournisseur result = ligneCommandeFournisseurRepository.save(ligneCommandeFournisseur);
        return ResponseEntity
            .created(new URI("/api/ligne-commande-fournisseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-commande-fournisseurs/:id} : Updates an existing ligneCommandeFournisseur.
     *
     * @param id the id of the ligneCommandeFournisseur to save.
     * @param ligneCommandeFournisseur the ligneCommandeFournisseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneCommandeFournisseur,
     * or with status {@code 400 (Bad Request)} if the ligneCommandeFournisseur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneCommandeFournisseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-commande-fournisseurs/{id}")
    public ResponseEntity<LigneCommandeFournisseur> updateLigneCommandeFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneCommandeFournisseur ligneCommandeFournisseur
    ) throws URISyntaxException {
        log.debug("REST request to update LigneCommandeFournisseur : {}, {}", id, ligneCommandeFournisseur);
        if (ligneCommandeFournisseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneCommandeFournisseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneCommandeFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LigneCommandeFournisseur result = ligneCommandeFournisseurRepository.save(ligneCommandeFournisseur);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneCommandeFournisseur.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ligne-commande-fournisseurs/:id} : Partial updates given fields of an existing ligneCommandeFournisseur, field will ignore if it is null
     *
     * @param id the id of the ligneCommandeFournisseur to save.
     * @param ligneCommandeFournisseur the ligneCommandeFournisseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneCommandeFournisseur,
     * or with status {@code 400 (Bad Request)} if the ligneCommandeFournisseur is not valid,
     * or with status {@code 404 (Not Found)} if the ligneCommandeFournisseur is not found,
     * or with status {@code 500 (Internal Server Error)} if the ligneCommandeFournisseur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ligne-commande-fournisseurs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LigneCommandeFournisseur> partialUpdateLigneCommandeFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneCommandeFournisseur ligneCommandeFournisseur
    ) throws URISyntaxException {
        log.debug("REST request to partial update LigneCommandeFournisseur partially : {}, {}", id, ligneCommandeFournisseur);
        if (ligneCommandeFournisseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneCommandeFournisseur.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneCommandeFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LigneCommandeFournisseur> result = ligneCommandeFournisseurRepository
            .findById(ligneCommandeFournisseur.getId())
            .map(existingLigneCommandeFournisseur -> {
                if (ligneCommandeFournisseur.getQuantite() != null) {
                    existingLigneCommandeFournisseur.setQuantite(ligneCommandeFournisseur.getQuantite());
                }

                return existingLigneCommandeFournisseur;
            })
            .map(ligneCommandeFournisseurRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneCommandeFournisseur.getId().toString())
        );
    }

    /**
     * {@code GET  /ligne-commande-fournisseurs} : get all the ligneCommandeFournisseurs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneCommandeFournisseurs in body.
     */
    @GetMapping("/ligne-commande-fournisseurs")
    public ResponseEntity<List<LigneCommandeFournisseur>> getAllLigneCommandeFournisseurs(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of LigneCommandeFournisseurs");
        Page<LigneCommandeFournisseur> page = ligneCommandeFournisseurRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-commande-fournisseurs/:id} : get the "id" ligneCommandeFournisseur.
     *
     * @param id the id of the ligneCommandeFournisseur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneCommandeFournisseur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-commande-fournisseurs/{id}")
    public ResponseEntity<LigneCommandeFournisseur> getLigneCommandeFournisseur(@PathVariable Long id) {
        log.debug("REST request to get LigneCommandeFournisseur : {}", id);
        Optional<LigneCommandeFournisseur> ligneCommandeFournisseur = ligneCommandeFournisseurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneCommandeFournisseur);
    }

    /**
     * {@code DELETE  /ligne-commande-fournisseurs/:id} : delete the "id" ligneCommandeFournisseur.
     *
     * @param id the id of the ligneCommandeFournisseur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-commande-fournisseurs/{id}")
    public ResponseEntity<Void> deleteLigneCommandeFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete LigneCommandeFournisseur : {}", id);
        ligneCommandeFournisseurRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

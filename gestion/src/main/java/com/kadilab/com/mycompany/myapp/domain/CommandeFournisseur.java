package com.kadilab.com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CommandeFournisseur.
 */
@Entity
@Table(name = "commande_fournisseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommandeFournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_fin")
    private Instant dateFin;

    @Column(name = "statut")
    private String statut;

    @OneToMany(mappedBy = "commandeFournisseur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "commandeFournisseur" }, allowSetters = true)
    private Set<LigneCommandeFournisseur> lignecommandes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresse" }, allowSetters = true)
    private Fournisseur fournisseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CommandeFournisseur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return this.numero;
    }

    public CommandeFournisseur numero(String numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Instant getDateDebut() {
        return this.dateDebut;
    }

    public CommandeFournisseur dateDebut(Instant dateDebut) {
        this.setDateDebut(dateDebut);
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return this.dateFin;
    }

    public CommandeFournisseur dateFin(Instant dateFin) {
        this.setDateFin(dateFin);
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public String getStatut() {
        return this.statut;
    }

    public CommandeFournisseur statut(String statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Set<LigneCommandeFournisseur> getLignecommandes() {
        return this.lignecommandes;
    }

    public void setLignecommandes(Set<LigneCommandeFournisseur> ligneCommandeFournisseurs) {
        if (this.lignecommandes != null) {
            this.lignecommandes.forEach(i -> i.setCommandeFournisseur(null));
        }
        if (ligneCommandeFournisseurs != null) {
            ligneCommandeFournisseurs.forEach(i -> i.setCommandeFournisseur(this));
        }
        this.lignecommandes = ligneCommandeFournisseurs;
    }

    public CommandeFournisseur lignecommandes(Set<LigneCommandeFournisseur> ligneCommandeFournisseurs) {
        this.setLignecommandes(ligneCommandeFournisseurs);
        return this;
    }

    public CommandeFournisseur addLignecommande(LigneCommandeFournisseur ligneCommandeFournisseur) {
        this.lignecommandes.add(ligneCommandeFournisseur);
        ligneCommandeFournisseur.setCommandeFournisseur(this);
        return this;
    }

    public CommandeFournisseur removeLignecommande(LigneCommandeFournisseur ligneCommandeFournisseur) {
        this.lignecommandes.remove(ligneCommandeFournisseur);
        ligneCommandeFournisseur.setCommandeFournisseur(null);
        return this;
    }

    public Fournisseur getFournisseur() {
        return this.fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public CommandeFournisseur fournisseur(Fournisseur fournisseur) {
        this.setFournisseur(fournisseur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommandeFournisseur)) {
            return false;
        }
        return id != null && id.equals(((CommandeFournisseur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommandeFournisseur{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}

package com.kadilab.com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kadilab.com.mycompany.myapp.domain.enumeration.STATUS;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "remise")
    private Float remise;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private STATUS statut;

    @OneToMany(mappedBy = "commande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "commande" }, allowSetters = true)
    private Set<ProduitCommande> produitCommandes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresse" }, allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Commande date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Float getRemise() {
        return this.remise;
    }

    public Commande remise(Float remise) {
        this.setRemise(remise);
        return this;
    }

    public void setRemise(Float remise) {
        this.remise = remise;
    }

    public STATUS getStatut() {
        return this.statut;
    }

    public Commande statut(STATUS statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(STATUS statut) {
        this.statut = statut;
    }

    public Set<ProduitCommande> getProduitCommandes() {
        return this.produitCommandes;
    }

    public void setProduitCommandes(Set<ProduitCommande> produitCommandes) {
        if (this.produitCommandes != null) {
            this.produitCommandes.forEach(i -> i.setCommande(null));
        }
        if (produitCommandes != null) {
            produitCommandes.forEach(i -> i.setCommande(this));
        }
        this.produitCommandes = produitCommandes;
    }

    public Commande produitCommandes(Set<ProduitCommande> produitCommandes) {
        this.setProduitCommandes(produitCommandes);
        return this;
    }

    public Commande addProduitCommande(ProduitCommande produitCommande) {
        this.produitCommandes.add(produitCommande);
        produitCommande.setCommande(this);
        return this;
    }

    public Commande removeProduitCommande(ProduitCommande produitCommande) {
        this.produitCommandes.remove(produitCommande);
        produitCommande.setCommande(null);
        return this;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Commande client(Client client) {
        this.setClient(client);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", remise=" + getRemise() +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}

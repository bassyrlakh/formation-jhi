package com.senelec.formation.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A Facture.
 */
@Entity
@Table(name = "facture")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Facture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "numero_facture")
    private String numeroFacture;

    @Column(name = "date_facture")
    private LocalDate dateFacture;

    @Column(name = "date_echeance")
    private LocalDate dateEcheance;

    @Column(name = "montant_facture", precision = 21, scale = 2)
    private BigDecimal montantFacture;

    @Column(name = "cons_tot")
    private Double consTot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "client" }, allowSetters = true)
    private Compteur compteur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Facture id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroFacture() {
        return this.numeroFacture;
    }

    public Facture numeroFacture(String numeroFacture) {
        this.setNumeroFacture(numeroFacture);
        return this;
    }

    public void setNumeroFacture(String numeroFacture) {
        this.numeroFacture = numeroFacture;
    }

    public LocalDate getDateFacture() {
        return this.dateFacture;
    }

    public Facture dateFacture(LocalDate dateFacture) {
        this.setDateFacture(dateFacture);
        return this;
    }

    public void setDateFacture(LocalDate dateFacture) {
        this.dateFacture = dateFacture;
    }

    public LocalDate getDateEcheance() {
        return this.dateEcheance;
    }

    public Facture dateEcheance(LocalDate dateEcheance) {
        this.setDateEcheance(dateEcheance);
        return this;
    }

    public void setDateEcheance(LocalDate dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public BigDecimal getMontantFacture() {
        return this.montantFacture;
    }

    public Facture montantFacture(BigDecimal montantFacture) {
        this.setMontantFacture(montantFacture);
        return this;
    }

    public void setMontantFacture(BigDecimal montantFacture) {
        this.montantFacture = montantFacture;
    }

    public Double getConsTot() {
        return this.consTot;
    }

    public Facture consTot(Double consTot) {
        this.setConsTot(consTot);
        return this;
    }

    public void setConsTot(Double consTot) {
        this.consTot = consTot;
    }

    public Compteur getCompteur() {
        return this.compteur;
    }

    public void setCompteur(Compteur compteur) {
        this.compteur = compteur;
    }

    public Facture compteur(Compteur compteur) {
        this.setCompteur(compteur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facture)) {
            return false;
        }
        return getId() != null && getId().equals(((Facture) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Facture{" +
            "id=" + getId() +
            ", numeroFacture='" + getNumeroFacture() + "'" +
            ", dateFacture='" + getDateFacture() + "'" +
            ", dateEcheance='" + getDateEcheance() + "'" +
            ", montantFacture=" + getMontantFacture() +
            ", consTot=" + getConsTot() +
            "}";
    }
}

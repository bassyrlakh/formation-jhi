package com.senelec.formation.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.senelec.formation.domain.Facture} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FactureDTO implements Serializable {

    private Long id;

    private String numeroFacture;

    private LocalDate dateFacture;

    private LocalDate dateEcheance;

    private BigDecimal montantFacture;

    private Double consTot;

    private CompteurDTO compteur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroFacture() {
        return numeroFacture;
    }

    public void setNumeroFacture(String numeroFacture) {
        this.numeroFacture = numeroFacture;
    }

    public LocalDate getDateFacture() {
        return dateFacture;
    }

    public void setDateFacture(LocalDate dateFacture) {
        this.dateFacture = dateFacture;
    }

    public LocalDate getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(LocalDate dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public BigDecimal getMontantFacture() {
        return montantFacture;
    }

    public void setMontantFacture(BigDecimal montantFacture) {
        this.montantFacture = montantFacture;
    }

    public Double getConsTot() {
        return consTot;
    }

    public void setConsTot(Double consTot) {
        this.consTot = consTot;
    }

    public CompteurDTO getCompteur() {
        return compteur;
    }

    public void setCompteur(CompteurDTO compteur) {
        this.compteur = compteur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FactureDTO)) {
            return false;
        }

        FactureDTO factureDTO = (FactureDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, factureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FactureDTO{" +
            "id=" + getId() +
            ", numeroFacture='" + getNumeroFacture() + "'" +
            ", dateFacture='" + getDateFacture() + "'" +
            ", dateEcheance='" + getDateEcheance() + "'" +
            ", montantFacture=" + getMontantFacture() +
            ", consTot=" + getConsTot() +
            ", compteur=" + getCompteur() +
            "}";
    }
}

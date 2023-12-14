package com.senelec.formation.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Compteur.
 */
@Entity
@Table(name = "compteur")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Compteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false, unique = true)
    private String numero;

    @NotNull
    @Column(name = "type", nullable = false, unique = true)
    private String type;

    @NotNull
    @Column(name = "phase", nullable = false)
    private Integer phase;

    @Column(name = "date_dernier_achat")
    private Instant dateDernierAchat;

    @Column(name = "fabricant")
    private String fabricant;

    @Column(name = "cumul_energie_mensuelle")
    private Double cumulEnergieMensuelle;

    @ManyToOne(fetch = FetchType.LAZY)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Compteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return this.numero;
    }

    public Compteur numero(String numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getType() {
        return this.type;
    }

    public Compteur type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPhase() {
        return this.phase;
    }

    public Compteur phase(Integer phase) {
        this.setPhase(phase);
        return this;
    }

    public void setPhase(Integer phase) {
        this.phase = phase;
    }

    public Instant getDateDernierAchat() {
        return this.dateDernierAchat;
    }

    public Compteur dateDernierAchat(Instant dateDernierAchat) {
        this.setDateDernierAchat(dateDernierAchat);
        return this;
    }

    public void setDateDernierAchat(Instant dateDernierAchat) {
        this.dateDernierAchat = dateDernierAchat;
    }

    public String getFabricant() {
        return this.fabricant;
    }

    public Compteur fabricant(String fabricant) {
        this.setFabricant(fabricant);
        return this;
    }

    public void setFabricant(String fabricant) {
        this.fabricant = fabricant;
    }

    public Double getCumulEnergieMensuelle() {
        return this.cumulEnergieMensuelle;
    }

    public Compteur cumulEnergieMensuelle(Double cumulEnergieMensuelle) {
        this.setCumulEnergieMensuelle(cumulEnergieMensuelle);
        return this;
    }

    public void setCumulEnergieMensuelle(Double cumulEnergieMensuelle) {
        this.cumulEnergieMensuelle = cumulEnergieMensuelle;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Compteur client(Client client) {
        this.setClient(client);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Compteur)) {
            return false;
        }
        return getId() != null && getId().equals(((Compteur) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Compteur{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", type='" + getType() + "'" +
            ", phase=" + getPhase() +
            ", dateDernierAchat='" + getDateDernierAchat() + "'" +
            ", fabricant='" + getFabricant() + "'" +
            ", cumulEnergieMensuelle=" + getCumulEnergieMensuelle() +
            "}";
    }
}

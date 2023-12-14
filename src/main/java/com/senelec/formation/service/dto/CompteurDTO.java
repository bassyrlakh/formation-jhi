package com.senelec.formation.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.senelec.formation.domain.Compteur} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CompteurDTO implements Serializable {

    private Long id;

    @NotNull
    private String numero;

    @NotNull
    private String type;

    @NotNull
    private Integer phase;

    private Instant dateDernierAchat;

    private String fabricant;

    private Double cumulEnergieMensuelle;

    private ClientDTO client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPhase() {
        return phase;
    }

    public void setPhase(Integer phase) {
        this.phase = phase;
    }

    public Instant getDateDernierAchat() {
        return dateDernierAchat;
    }

    public void setDateDernierAchat(Instant dateDernierAchat) {
        this.dateDernierAchat = dateDernierAchat;
    }

    public String getFabricant() {
        return fabricant;
    }

    public void setFabricant(String fabricant) {
        this.fabricant = fabricant;
    }

    public Double getCumulEnergieMensuelle() {
        return cumulEnergieMensuelle;
    }

    public void setCumulEnergieMensuelle(Double cumulEnergieMensuelle) {
        this.cumulEnergieMensuelle = cumulEnergieMensuelle;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompteurDTO)) {
            return false;
        }

        CompteurDTO compteurDTO = (CompteurDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, compteurDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CompteurDTO{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", type='" + getType() + "'" +
            ", phase=" + getPhase() +
            ", dateDernierAchat='" + getDateDernierAchat() + "'" +
            ", fabricant='" + getFabricant() + "'" +
            ", cumulEnergieMensuelle=" + getCumulEnergieMensuelle() +
            ", client=" + getClient() +
            "}";
    }
}

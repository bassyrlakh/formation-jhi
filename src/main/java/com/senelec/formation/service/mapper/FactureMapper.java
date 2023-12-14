package com.senelec.formation.service.mapper;

import com.senelec.formation.domain.Compteur;
import com.senelec.formation.domain.Facture;
import com.senelec.formation.service.dto.CompteurDTO;
import com.senelec.formation.service.dto.FactureDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Facture} and its DTO {@link FactureDTO}.
 */
@Mapper(componentModel = "spring")
public interface FactureMapper extends EntityMapper<FactureDTO, Facture> {
    @Mapping(target = "compteur", source = "compteur", qualifiedByName = "compteurId")
    FactureDTO toDto(Facture s);

    @Named("compteurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CompteurDTO toDtoCompteurId(Compteur compteur);
}

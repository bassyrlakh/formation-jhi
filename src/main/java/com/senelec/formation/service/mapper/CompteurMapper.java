package com.senelec.formation.service.mapper;

import com.senelec.formation.domain.Client;
import com.senelec.formation.domain.Compteur;
import com.senelec.formation.service.dto.ClientDTO;
import com.senelec.formation.service.dto.CompteurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Compteur} and its DTO {@link CompteurDTO}.
 */
@Mapper(componentModel = "spring")
public interface CompteurMapper extends EntityMapper<CompteurDTO, Compteur> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    CompteurDTO toDto(Compteur s);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);
}

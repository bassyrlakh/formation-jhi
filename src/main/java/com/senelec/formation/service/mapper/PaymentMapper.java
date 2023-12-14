package com.senelec.formation.service.mapper;

import com.senelec.formation.domain.Facture;
import com.senelec.formation.domain.Payment;
import com.senelec.formation.service.dto.FactureDTO;
import com.senelec.formation.service.dto.PaymentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    @Mapping(target = "facture", source = "facture", qualifiedByName = "factureId")
    PaymentDTO toDto(Payment s);

    @Named("factureId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FactureDTO toDtoFactureId(Facture facture);
}

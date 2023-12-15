package com.senelec.formation.service.impl;

import com.senelec.formation.domain.Compteur;
import com.senelec.formation.repository.CompteurRepository;
import com.senelec.formation.service.CompteurService;
import com.senelec.formation.service.dto.CompteurDTO;
import com.senelec.formation.service.mapper.CompteurMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.senelec.formation.domain.Compteur}.
 */
@Service
@Transactional
public class CompteurServiceImpl implements CompteurService {

    private final Logger log = LoggerFactory.getLogger(CompteurServiceImpl.class);

    private final CompteurRepository compteurRepository;

    private final CompteurMapper compteurMapper;

    public CompteurServiceImpl(CompteurRepository compteurRepository, CompteurMapper compteurMapper) {
        this.compteurRepository = compteurRepository;
        this.compteurMapper = compteurMapper;
    }

    @Override
    public CompteurDTO save(CompteurDTO compteurDTO) {
        log.debug("Request to save Compteur : {}", compteurDTO);
        Compteur compteur = compteurMapper.toEntity(compteurDTO);
        compteur = compteurRepository.save(compteur);
        return compteurMapper.toDto(compteur);
    }

    @Override
    public CompteurDTO update(CompteurDTO compteurDTO) {
        log.debug("Request to update Compteur : {}", compteurDTO);
        Compteur compteur = compteurMapper.toEntity(compteurDTO);
        compteur = compteurRepository.save(compteur);
        return compteurMapper.toDto(compteur);
    }

    @Override
    public Optional<CompteurDTO> partialUpdate(CompteurDTO compteurDTO) {
        log.debug("Request to partially update Compteur : {}", compteurDTO);

        return compteurRepository
            .findById(compteurDTO.getId())
            .map(existingCompteur -> {
                compteurMapper.partialUpdate(existingCompteur, compteurDTO);

                return existingCompteur;
            })
            .map(compteurRepository::save)
            .map(compteurMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompteurDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Compteurs");
        return compteurRepository.findAll(pageable).map(compteurMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CompteurDTO> findOne(Long id) {
        log.debug("Request to get Compteur : {}", id);
        return compteurRepository.findById(id).map(compteurMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Compteur : {}", id);
        compteurRepository.deleteById(id);
    }

    @Override
    public Page<CompteurDTO> findCompteursByNumero(String numero, Pageable p) {
        return compteurRepository.findCompteursByNumero(numero, p).map(compteurMapper::toDto);
    }
}

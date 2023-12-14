package com.senelec.formation.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.senelec.formation.IntegrationTest;
import com.senelec.formation.domain.Compteur;
import com.senelec.formation.repository.CompteurRepository;
import com.senelec.formation.service.dto.CompteurDTO;
import com.senelec.formation.service.mapper.CompteurMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CompteurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CompteurResourceIT {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHASE = 1;
    private static final Integer UPDATED_PHASE = 2;

    private static final Instant DEFAULT_DATE_DERNIER_ACHAT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DERNIER_ACHAT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_FABRICANT = "AAAAAAAAAA";
    private static final String UPDATED_FABRICANT = "BBBBBBBBBB";

    private static final Double DEFAULT_CUMUL_ENERGIE_MENSUELLE = 1D;
    private static final Double UPDATED_CUMUL_ENERGIE_MENSUELLE = 2D;

    private static final String ENTITY_API_URL = "/api/compteurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CompteurRepository compteurRepository;

    @Autowired
    private CompteurMapper compteurMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompteurMockMvc;

    private Compteur compteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Compteur createEntity(EntityManager em) {
        Compteur compteur = new Compteur()
            .numero(DEFAULT_NUMERO)
            .type(DEFAULT_TYPE)
            .phase(DEFAULT_PHASE)
            .dateDernierAchat(DEFAULT_DATE_DERNIER_ACHAT)
            .fabricant(DEFAULT_FABRICANT)
            .cumulEnergieMensuelle(DEFAULT_CUMUL_ENERGIE_MENSUELLE);
        return compteur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Compteur createUpdatedEntity(EntityManager em) {
        Compteur compteur = new Compteur()
            .numero(UPDATED_NUMERO)
            .type(UPDATED_TYPE)
            .phase(UPDATED_PHASE)
            .dateDernierAchat(UPDATED_DATE_DERNIER_ACHAT)
            .fabricant(UPDATED_FABRICANT)
            .cumulEnergieMensuelle(UPDATED_CUMUL_ENERGIE_MENSUELLE);
        return compteur;
    }

    @BeforeEach
    public void initTest() {
        compteur = createEntity(em);
    }

    @Test
    @Transactional
    void createCompteur() throws Exception {
        int databaseSizeBeforeCreate = compteurRepository.findAll().size();
        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);
        restCompteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isCreated());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeCreate + 1);
        Compteur testCompteur = compteurList.get(compteurList.size() - 1);
        assertThat(testCompteur.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testCompteur.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCompteur.getPhase()).isEqualTo(DEFAULT_PHASE);
        assertThat(testCompteur.getDateDernierAchat()).isEqualTo(DEFAULT_DATE_DERNIER_ACHAT);
        assertThat(testCompteur.getFabricant()).isEqualTo(DEFAULT_FABRICANT);
        assertThat(testCompteur.getCumulEnergieMensuelle()).isEqualTo(DEFAULT_CUMUL_ENERGIE_MENSUELLE);
    }

    @Test
    @Transactional
    void createCompteurWithExistingId() throws Exception {
        // Create the Compteur with an existing ID
        compteur.setId(1L);
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        int databaseSizeBeforeCreate = compteurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = compteurRepository.findAll().size();
        // set the field null
        compteur.setNumero(null);

        // Create the Compteur, which fails.
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        restCompteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isBadRequest());

        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = compteurRepository.findAll().size();
        // set the field null
        compteur.setType(null);

        // Create the Compteur, which fails.
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        restCompteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isBadRequest());

        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPhaseIsRequired() throws Exception {
        int databaseSizeBeforeTest = compteurRepository.findAll().size();
        // set the field null
        compteur.setPhase(null);

        // Create the Compteur, which fails.
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        restCompteurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isBadRequest());

        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCompteurs() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        // Get all the compteurList
        restCompteurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].phase").value(hasItem(DEFAULT_PHASE)))
            .andExpect(jsonPath("$.[*].dateDernierAchat").value(hasItem(DEFAULT_DATE_DERNIER_ACHAT.toString())))
            .andExpect(jsonPath("$.[*].fabricant").value(hasItem(DEFAULT_FABRICANT)))
            .andExpect(jsonPath("$.[*].cumulEnergieMensuelle").value(hasItem(DEFAULT_CUMUL_ENERGIE_MENSUELLE.doubleValue())));
    }

    @Test
    @Transactional
    void getCompteur() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        // Get the compteur
        restCompteurMockMvc
            .perform(get(ENTITY_API_URL_ID, compteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(compteur.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.phase").value(DEFAULT_PHASE))
            .andExpect(jsonPath("$.dateDernierAchat").value(DEFAULT_DATE_DERNIER_ACHAT.toString()))
            .andExpect(jsonPath("$.fabricant").value(DEFAULT_FABRICANT))
            .andExpect(jsonPath("$.cumulEnergieMensuelle").value(DEFAULT_CUMUL_ENERGIE_MENSUELLE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCompteur() throws Exception {
        // Get the compteur
        restCompteurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCompteur() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();

        // Update the compteur
        Compteur updatedCompteur = compteurRepository.findById(compteur.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCompteur are not directly saved in db
        em.detach(updatedCompteur);
        updatedCompteur
            .numero(UPDATED_NUMERO)
            .type(UPDATED_TYPE)
            .phase(UPDATED_PHASE)
            .dateDernierAchat(UPDATED_DATE_DERNIER_ACHAT)
            .fabricant(UPDATED_FABRICANT)
            .cumulEnergieMensuelle(UPDATED_CUMUL_ENERGIE_MENSUELLE);
        CompteurDTO compteurDTO = compteurMapper.toDto(updatedCompteur);

        restCompteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, compteurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isOk());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
        Compteur testCompteur = compteurList.get(compteurList.size() - 1);
        assertThat(testCompteur.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testCompteur.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCompteur.getPhase()).isEqualTo(UPDATED_PHASE);
        assertThat(testCompteur.getDateDernierAchat()).isEqualTo(UPDATED_DATE_DERNIER_ACHAT);
        assertThat(testCompteur.getFabricant()).isEqualTo(UPDATED_FABRICANT);
        assertThat(testCompteur.getCumulEnergieMensuelle()).isEqualTo(UPDATED_CUMUL_ENERGIE_MENSUELLE);
    }

    @Test
    @Transactional
    void putNonExistingCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, compteurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(compteurDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCompteurWithPatch() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();

        // Update the compteur using partial update
        Compteur partialUpdatedCompteur = new Compteur();
        partialUpdatedCompteur.setId(compteur.getId());

        partialUpdatedCompteur
            .phase(UPDATED_PHASE)
            .dateDernierAchat(UPDATED_DATE_DERNIER_ACHAT)
            .fabricant(UPDATED_FABRICANT)
            .cumulEnergieMensuelle(UPDATED_CUMUL_ENERGIE_MENSUELLE);

        restCompteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCompteur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCompteur))
            )
            .andExpect(status().isOk());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
        Compteur testCompteur = compteurList.get(compteurList.size() - 1);
        assertThat(testCompteur.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testCompteur.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCompteur.getPhase()).isEqualTo(UPDATED_PHASE);
        assertThat(testCompteur.getDateDernierAchat()).isEqualTo(UPDATED_DATE_DERNIER_ACHAT);
        assertThat(testCompteur.getFabricant()).isEqualTo(UPDATED_FABRICANT);
        assertThat(testCompteur.getCumulEnergieMensuelle()).isEqualTo(UPDATED_CUMUL_ENERGIE_MENSUELLE);
    }

    @Test
    @Transactional
    void fullUpdateCompteurWithPatch() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();

        // Update the compteur using partial update
        Compteur partialUpdatedCompteur = new Compteur();
        partialUpdatedCompteur.setId(compteur.getId());

        partialUpdatedCompteur
            .numero(UPDATED_NUMERO)
            .type(UPDATED_TYPE)
            .phase(UPDATED_PHASE)
            .dateDernierAchat(UPDATED_DATE_DERNIER_ACHAT)
            .fabricant(UPDATED_FABRICANT)
            .cumulEnergieMensuelle(UPDATED_CUMUL_ENERGIE_MENSUELLE);

        restCompteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCompteur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCompteur))
            )
            .andExpect(status().isOk());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
        Compteur testCompteur = compteurList.get(compteurList.size() - 1);
        assertThat(testCompteur.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testCompteur.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCompteur.getPhase()).isEqualTo(UPDATED_PHASE);
        assertThat(testCompteur.getDateDernierAchat()).isEqualTo(UPDATED_DATE_DERNIER_ACHAT);
        assertThat(testCompteur.getFabricant()).isEqualTo(UPDATED_FABRICANT);
        assertThat(testCompteur.getCumulEnergieMensuelle()).isEqualTo(UPDATED_CUMUL_ENERGIE_MENSUELLE);
    }

    @Test
    @Transactional
    void patchNonExistingCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, compteurDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCompteur() throws Exception {
        int databaseSizeBeforeUpdate = compteurRepository.findAll().size();
        compteur.setId(longCount.incrementAndGet());

        // Create the Compteur
        CompteurDTO compteurDTO = compteurMapper.toDto(compteur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCompteurMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(compteurDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Compteur in the database
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCompteur() throws Exception {
        // Initialize the database
        compteurRepository.saveAndFlush(compteur);

        int databaseSizeBeforeDelete = compteurRepository.findAll().size();

        // Delete the compteur
        restCompteurMockMvc
            .perform(delete(ENTITY_API_URL_ID, compteur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Compteur> compteurList = compteurRepository.findAll();
        assertThat(compteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

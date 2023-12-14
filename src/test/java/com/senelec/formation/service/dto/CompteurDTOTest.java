package com.senelec.formation.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.senelec.formation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompteurDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompteurDTO.class);
        CompteurDTO compteurDTO1 = new CompteurDTO();
        compteurDTO1.setId(1L);
        CompteurDTO compteurDTO2 = new CompteurDTO();
        assertThat(compteurDTO1).isNotEqualTo(compteurDTO2);
        compteurDTO2.setId(compteurDTO1.getId());
        assertThat(compteurDTO1).isEqualTo(compteurDTO2);
        compteurDTO2.setId(2L);
        assertThat(compteurDTO1).isNotEqualTo(compteurDTO2);
        compteurDTO1.setId(null);
        assertThat(compteurDTO1).isNotEqualTo(compteurDTO2);
    }
}

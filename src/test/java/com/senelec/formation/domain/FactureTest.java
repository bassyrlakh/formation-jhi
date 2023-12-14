package com.senelec.formation.domain;

import static com.senelec.formation.domain.CompteurTestSamples.*;
import static com.senelec.formation.domain.FactureTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.senelec.formation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FactureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Facture.class);
        Facture facture1 = getFactureSample1();
        Facture facture2 = new Facture();
        assertThat(facture1).isNotEqualTo(facture2);

        facture2.setId(facture1.getId());
        assertThat(facture1).isEqualTo(facture2);

        facture2 = getFactureSample2();
        assertThat(facture1).isNotEqualTo(facture2);
    }

    @Test
    void compteurTest() throws Exception {
        Facture facture = getFactureRandomSampleGenerator();
        Compteur compteurBack = getCompteurRandomSampleGenerator();

        facture.setCompteur(compteurBack);
        assertThat(facture.getCompteur()).isEqualTo(compteurBack);

        facture.compteur(null);
        assertThat(facture.getCompteur()).isNull();
    }
}

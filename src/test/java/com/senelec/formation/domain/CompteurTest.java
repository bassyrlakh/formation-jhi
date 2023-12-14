package com.senelec.formation.domain;

import static com.senelec.formation.domain.ClientTestSamples.*;
import static com.senelec.formation.domain.CompteurTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.senelec.formation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompteurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Compteur.class);
        Compteur compteur1 = getCompteurSample1();
        Compteur compteur2 = new Compteur();
        assertThat(compteur1).isNotEqualTo(compteur2);

        compteur2.setId(compteur1.getId());
        assertThat(compteur1).isEqualTo(compteur2);

        compteur2 = getCompteurSample2();
        assertThat(compteur1).isNotEqualTo(compteur2);
    }

    @Test
    void clientTest() throws Exception {
        Compteur compteur = getCompteurRandomSampleGenerator();
        Client clientBack = getClientRandomSampleGenerator();

        compteur.setClient(clientBack);
        assertThat(compteur.getClient()).isEqualTo(clientBack);

        compteur.client(null);
        assertThat(compteur.getClient()).isNull();
    }
}

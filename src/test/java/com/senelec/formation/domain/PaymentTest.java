package com.senelec.formation.domain;

import static com.senelec.formation.domain.FactureTestSamples.*;
import static com.senelec.formation.domain.PaymentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.senelec.formation.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Payment.class);
        Payment payment1 = getPaymentSample1();
        Payment payment2 = new Payment();
        assertThat(payment1).isNotEqualTo(payment2);

        payment2.setId(payment1.getId());
        assertThat(payment1).isEqualTo(payment2);

        payment2 = getPaymentSample2();
        assertThat(payment1).isNotEqualTo(payment2);
    }

    @Test
    void factureTest() throws Exception {
        Payment payment = getPaymentRandomSampleGenerator();
        Facture factureBack = getFactureRandomSampleGenerator();

        payment.setFacture(factureBack);
        assertThat(payment.getFacture()).isEqualTo(factureBack);

        payment.facture(null);
        assertThat(payment.getFacture()).isNull();
    }
}

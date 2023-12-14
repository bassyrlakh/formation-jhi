package com.senelec.formation.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class CompteurTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Compteur getCompteurSample1() {
        return new Compteur().id(1L).numero("numero1").type("type1").phase(1).fabricant("fabricant1");
    }

    public static Compteur getCompteurSample2() {
        return new Compteur().id(2L).numero("numero2").type("type2").phase(2).fabricant("fabricant2");
    }

    public static Compteur getCompteurRandomSampleGenerator() {
        return new Compteur()
            .id(longCount.incrementAndGet())
            .numero(UUID.randomUUID().toString())
            .type(UUID.randomUUID().toString())
            .phase(intCount.incrementAndGet())
            .fabricant(UUID.randomUUID().toString());
    }
}

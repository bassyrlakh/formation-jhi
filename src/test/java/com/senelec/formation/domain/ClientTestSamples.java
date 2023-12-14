package com.senelec.formation.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ClientTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Client getClientSample1() {
        return new Client().id(1L).lastName("lastName1").firstName("firstName1");
    }

    public static Client getClientSample2() {
        return new Client().id(2L).lastName("lastName2").firstName("firstName2");
    }

    public static Client getClientRandomSampleGenerator() {
        return new Client().id(longCount.incrementAndGet()).lastName(UUID.randomUUID().toString()).firstName(UUID.randomUUID().toString());
    }
}

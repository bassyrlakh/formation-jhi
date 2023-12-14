import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        data: { pageTitle: 'Clients' },
        loadChildren: () => import('./client/client.routes'),
      },
      {
        path: 'compteur',
        data: { pageTitle: 'Compteurs' },
        loadChildren: () => import('./compteur/compteur.routes'),
      },
      {
        path: 'facture',
        data: { pageTitle: 'Factures' },
        loadChildren: () => import('./facture/facture.routes'),
      },
      {
        path: 'payment',
        data: { pageTitle: 'Payments' },
        loadChildren: () => import('./payment/payment.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FactureComponent } from './list/facture.component';
import { FactureDetailComponent } from './detail/facture-detail.component';
import { FactureUpdateComponent } from './update/facture-update.component';
import FactureResolve from './route/facture-routing-resolve.service';

const factureRoute: Routes = [
  {
    path: '',
    component: FactureComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FactureDetailComponent,
    resolve: {
      facture: FactureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default factureRoute;

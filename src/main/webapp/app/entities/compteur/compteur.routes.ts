import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CompteurComponent } from './list/compteur.component';
import { CompteurDetailComponent } from './detail/compteur-detail.component';
import { CompteurUpdateComponent } from './update/compteur-update.component';
import CompteurResolve from './route/compteur-routing-resolve.service';

const compteurRoute: Routes = [
  {
    path: '',
    component: CompteurComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompteurDetailComponent,
    resolve: {
      compteur: CompteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompteurUpdateComponent,
    resolve: {
      compteur: CompteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompteurUpdateComponent,
    resolve: {
      compteur: CompteurResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default compteurRoute;

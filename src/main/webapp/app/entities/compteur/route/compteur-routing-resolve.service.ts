import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompteur } from '../compteur.model';
import { CompteurService } from '../service/compteur.service';

export const compteurResolve = (route: ActivatedRouteSnapshot): Observable<null | ICompteur> => {
  const id = route.params['id'];
  if (id) {
    return inject(CompteurService)
      .find(id)
      .pipe(
        mergeMap((compteur: HttpResponse<ICompteur>) => {
          if (compteur.body) {
            return of(compteur.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default compteurResolve;

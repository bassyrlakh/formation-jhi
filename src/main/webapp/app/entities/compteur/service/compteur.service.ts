import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompteur, NewCompteur } from '../compteur.model';

export type PartialUpdateCompteur = Partial<ICompteur> & Pick<ICompteur, 'id'>;

type RestOf<T extends ICompteur | NewCompteur> = Omit<T, 'dateDernierAchat'> & {
  dateDernierAchat?: string | null;
};

export type RestCompteur = RestOf<ICompteur>;

export type NewRestCompteur = RestOf<NewCompteur>;

export type PartialUpdateRestCompteur = RestOf<PartialUpdateCompteur>;

export type EntityResponseType = HttpResponse<ICompteur>;
export type EntityArrayResponseType = HttpResponse<ICompteur[]>;

@Injectable({ providedIn: 'root' })
export class CompteurService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/compteurs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(compteur: NewCompteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(compteur);
    return this.http
      .post<RestCompteur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(compteur: ICompteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(compteur);
    return this.http
      .put<RestCompteur>(`${this.resourceUrl}/${this.getCompteurIdentifier(compteur)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(compteur: PartialUpdateCompteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(compteur);
    return this.http
      .patch<RestCompteur>(`${this.resourceUrl}/${this.getCompteurIdentifier(compteur)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCompteur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCompteur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  queryFromBack(query: String): Observable<EntityArrayResponseType> {
    return this.http
      .get<RestCompteur[]>(`${this.resourceUrl}/search?query=${query}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCompteurIdentifier(compteur: Pick<ICompteur, 'id'>): number {
    return compteur.id;
  }

  compareCompteur(o1: Pick<ICompteur, 'id'> | null, o2: Pick<ICompteur, 'id'> | null): boolean {
    return o1 && o2 ? this.getCompteurIdentifier(o1) === this.getCompteurIdentifier(o2) : o1 === o2;
  }

  addCompteurToCollectionIfMissing<Type extends Pick<ICompteur, 'id'>>(
    compteurCollection: Type[],
    ...compteursToCheck: (Type | null | undefined)[]
  ): Type[] {
    const compteurs: Type[] = compteursToCheck.filter(isPresent);
    if (compteurs.length > 0) {
      const compteurCollectionIdentifiers = compteurCollection.map(compteurItem => this.getCompteurIdentifier(compteurItem)!);
      const compteursToAdd = compteurs.filter(compteurItem => {
        const compteurIdentifier = this.getCompteurIdentifier(compteurItem);
        if (compteurCollectionIdentifiers.includes(compteurIdentifier)) {
          return false;
        }
        compteurCollectionIdentifiers.push(compteurIdentifier);
        return true;
      });
      return [...compteursToAdd, ...compteurCollection];
    }
    return compteurCollection;
  }

  protected convertDateFromClient<T extends ICompteur | NewCompteur | PartialUpdateCompteur>(compteur: T): RestOf<T> {
    return {
      ...compteur,
      dateDernierAchat: compteur.dateDernierAchat?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCompteur: RestCompteur): ICompteur {
    return {
      ...restCompteur,
      dateDernierAchat: restCompteur.dateDernierAchat ? dayjs(restCompteur.dateDernierAchat) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCompteur>): HttpResponse<ICompteur> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCompteur[]>): HttpResponse<ICompteur[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}

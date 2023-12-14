import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICompteur } from '../compteur.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../compteur.test-samples';

import { CompteurService, RestCompteur } from './compteur.service';

const requireRestSample: RestCompteur = {
  ...sampleWithRequiredData,
  dateDernierAchat: sampleWithRequiredData.dateDernierAchat?.toJSON(),
};

describe('Compteur Service', () => {
  let service: CompteurService;
  let httpMock: HttpTestingController;
  let expectedResult: ICompteur | ICompteur[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompteurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Compteur', () => {
      const compteur = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(compteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Compteur', () => {
      const compteur = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(compteur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Compteur', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Compteur', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Compteur', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCompteurToCollectionIfMissing', () => {
      it('should add a Compteur to an empty array', () => {
        const compteur: ICompteur = sampleWithRequiredData;
        expectedResult = service.addCompteurToCollectionIfMissing([], compteur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compteur);
      });

      it('should not add a Compteur to an array that contains it', () => {
        const compteur: ICompteur = sampleWithRequiredData;
        const compteurCollection: ICompteur[] = [
          {
            ...compteur,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCompteurToCollectionIfMissing(compteurCollection, compteur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Compteur to an array that doesn't contain it", () => {
        const compteur: ICompteur = sampleWithRequiredData;
        const compteurCollection: ICompteur[] = [sampleWithPartialData];
        expectedResult = service.addCompteurToCollectionIfMissing(compteurCollection, compteur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compteur);
      });

      it('should add only unique Compteur to an array', () => {
        const compteurArray: ICompteur[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const compteurCollection: ICompteur[] = [sampleWithRequiredData];
        expectedResult = service.addCompteurToCollectionIfMissing(compteurCollection, ...compteurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const compteur: ICompteur = sampleWithRequiredData;
        const compteur2: ICompteur = sampleWithPartialData;
        expectedResult = service.addCompteurToCollectionIfMissing([], compteur, compteur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compteur);
        expect(expectedResult).toContain(compteur2);
      });

      it('should accept null and undefined values', () => {
        const compteur: ICompteur = sampleWithRequiredData;
        expectedResult = service.addCompteurToCollectionIfMissing([], null, compteur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compteur);
      });

      it('should return initial array if no Compteur is added', () => {
        const compteurCollection: ICompteur[] = [sampleWithRequiredData];
        expectedResult = service.addCompteurToCollectionIfMissing(compteurCollection, undefined, null);
        expect(expectedResult).toEqual(compteurCollection);
      });
    });

    describe('compareCompteur', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCompteur(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCompteur(entity1, entity2);
        const compareResult2 = service.compareCompteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCompteur(entity1, entity2);
        const compareResult2 = service.compareCompteur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCompteur(entity1, entity2);
        const compareResult2 = service.compareCompteur(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

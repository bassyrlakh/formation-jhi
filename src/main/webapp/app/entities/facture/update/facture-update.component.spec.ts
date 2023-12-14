import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICompteur } from 'app/entities/compteur/compteur.model';
import { CompteurService } from 'app/entities/compteur/service/compteur.service';
import { FactureService } from '../service/facture.service';
import { IFacture } from '../facture.model';
import { FactureFormService } from './facture-form.service';

import { FactureUpdateComponent } from './facture-update.component';

describe('Facture Management Update Component', () => {
  let comp: FactureUpdateComponent;
  let fixture: ComponentFixture<FactureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let factureFormService: FactureFormService;
  let factureService: FactureService;
  let compteurService: CompteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FactureUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FactureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FactureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    factureFormService = TestBed.inject(FactureFormService);
    factureService = TestBed.inject(FactureService);
    compteurService = TestBed.inject(CompteurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Compteur query and add missing value', () => {
      const facture: IFacture = { id: 456 };
      const compteur: ICompteur = { id: 32742 };
      facture.compteur = compteur;

      const compteurCollection: ICompteur[] = [{ id: 24116 }];
      jest.spyOn(compteurService, 'query').mockReturnValue(of(new HttpResponse({ body: compteurCollection })));
      const additionalCompteurs = [compteur];
      const expectedCollection: ICompteur[] = [...additionalCompteurs, ...compteurCollection];
      jest.spyOn(compteurService, 'addCompteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facture });
      comp.ngOnInit();

      expect(compteurService.query).toHaveBeenCalled();
      expect(compteurService.addCompteurToCollectionIfMissing).toHaveBeenCalledWith(
        compteurCollection,
        ...additionalCompteurs.map(expect.objectContaining),
      );
      expect(comp.compteursSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const facture: IFacture = { id: 456 };
      const compteur: ICompteur = { id: 21997 };
      facture.compteur = compteur;

      activatedRoute.data = of({ facture });
      comp.ngOnInit();

      expect(comp.compteursSharedCollection).toContain(compteur);
      expect(comp.facture).toEqual(facture);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFacture>>();
      const facture = { id: 123 };
      jest.spyOn(factureFormService, 'getFacture').mockReturnValue(facture);
      jest.spyOn(factureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facture });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facture }));
      saveSubject.complete();

      // THEN
      expect(factureFormService.getFacture).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(factureService.update).toHaveBeenCalledWith(expect.objectContaining(facture));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFacture>>();
      const facture = { id: 123 };
      jest.spyOn(factureFormService, 'getFacture').mockReturnValue({ id: null });
      jest.spyOn(factureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facture: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facture }));
      saveSubject.complete();

      // THEN
      expect(factureFormService.getFacture).toHaveBeenCalled();
      expect(factureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFacture>>();
      const facture = { id: 123 };
      jest.spyOn(factureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facture });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(factureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCompteur', () => {
      it('Should forward to compteurService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(compteurService, 'compareCompteur');
        comp.compareCompteur(entity, entity2);
        expect(compteurService.compareCompteur).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

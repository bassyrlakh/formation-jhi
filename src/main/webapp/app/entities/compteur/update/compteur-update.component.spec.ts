import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { CompteurService } from '../service/compteur.service';
import { ICompteur } from '../compteur.model';
import { CompteurFormService } from './compteur-form.service';

import { CompteurUpdateComponent } from './compteur-update.component';

describe('Compteur Management Update Component', () => {
  let comp: CompteurUpdateComponent;
  let fixture: ComponentFixture<CompteurUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let compteurFormService: CompteurFormService;
  let compteurService: CompteurService;
  let clientService: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CompteurUpdateComponent],
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
      .overrideTemplate(CompteurUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompteurUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    compteurFormService = TestBed.inject(CompteurFormService);
    compteurService = TestBed.inject(CompteurService);
    clientService = TestBed.inject(ClientService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Client query and add missing value', () => {
      const compteur: ICompteur = { id: 456 };
      const client: IClient = { id: 23019 };
      compteur.client = client;

      const clientCollection: IClient[] = [{ id: 30488 }];
      jest.spyOn(clientService, 'query').mockReturnValue(of(new HttpResponse({ body: clientCollection })));
      const additionalClients = [client];
      const expectedCollection: IClient[] = [...additionalClients, ...clientCollection];
      jest.spyOn(clientService, 'addClientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ compteur });
      comp.ngOnInit();

      expect(clientService.query).toHaveBeenCalled();
      expect(clientService.addClientToCollectionIfMissing).toHaveBeenCalledWith(
        clientCollection,
        ...additionalClients.map(expect.objectContaining),
      );
      expect(comp.clientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const compteur: ICompteur = { id: 456 };
      const client: IClient = { id: 18904 };
      compteur.client = client;

      activatedRoute.data = of({ compteur });
      comp.ngOnInit();

      expect(comp.clientsSharedCollection).toContain(client);
      expect(comp.compteur).toEqual(compteur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompteur>>();
      const compteur = { id: 123 };
      jest.spyOn(compteurFormService, 'getCompteur').mockReturnValue(compteur);
      jest.spyOn(compteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compteur }));
      saveSubject.complete();

      // THEN
      expect(compteurFormService.getCompteur).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(compteurService.update).toHaveBeenCalledWith(expect.objectContaining(compteur));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompteur>>();
      const compteur = { id: 123 };
      jest.spyOn(compteurFormService, 'getCompteur').mockReturnValue({ id: null });
      jest.spyOn(compteurService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compteur: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compteur }));
      saveSubject.complete();

      // THEN
      expect(compteurFormService.getCompteur).toHaveBeenCalled();
      expect(compteurService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompteur>>();
      const compteur = { id: 123 };
      jest.spyOn(compteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(compteurService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClient', () => {
      it('Should forward to clientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clientService, 'compareClient');
        comp.compareClient(entity, entity2);
        expect(clientService.compareClient).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

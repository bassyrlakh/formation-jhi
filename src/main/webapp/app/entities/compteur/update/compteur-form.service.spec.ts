import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../compteur.test-samples';

import { CompteurFormService } from './compteur-form.service';

describe('Compteur Form Service', () => {
  let service: CompteurFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteurFormService);
  });

  describe('Service methods', () => {
    describe('createCompteurFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCompteurFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numero: expect.any(Object),
            type: expect.any(Object),
            phase: expect.any(Object),
            dateDernierAchat: expect.any(Object),
            fabricant: expect.any(Object),
            cumulEnergieMensuelle: expect.any(Object),
            client: expect.any(Object),
          }),
        );
      });

      it('passing ICompteur should create a new form with FormGroup', () => {
        const formGroup = service.createCompteurFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numero: expect.any(Object),
            type: expect.any(Object),
            phase: expect.any(Object),
            dateDernierAchat: expect.any(Object),
            fabricant: expect.any(Object),
            cumulEnergieMensuelle: expect.any(Object),
            client: expect.any(Object),
          }),
        );
      });
    });

    describe('getCompteur', () => {
      it('should return NewCompteur for default Compteur initial value', () => {
        const formGroup = service.createCompteurFormGroup(sampleWithNewData);

        const compteur = service.getCompteur(formGroup) as any;

        expect(compteur).toMatchObject(sampleWithNewData);
      });

      it('should return NewCompteur for empty Compteur initial value', () => {
        const formGroup = service.createCompteurFormGroup();

        const compteur = service.getCompteur(formGroup) as any;

        expect(compteur).toMatchObject({});
      });

      it('should return ICompteur', () => {
        const formGroup = service.createCompteurFormGroup(sampleWithRequiredData);

        const compteur = service.getCompteur(formGroup) as any;

        expect(compteur).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICompteur should not enable id FormControl', () => {
        const formGroup = service.createCompteurFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCompteur should disable id FormControl', () => {
        const formGroup = service.createCompteurFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

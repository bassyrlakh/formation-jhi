import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFacture, NewFacture } from '../facture.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFacture for edit and NewFactureFormGroupInput for create.
 */
type FactureFormGroupInput = IFacture | PartialWithRequiredKeyOf<NewFacture>;

type FactureFormDefaults = Pick<NewFacture, 'id'>;

type FactureFormGroupContent = {
  id: FormControl<IFacture['id'] | NewFacture['id']>;
  numeroFacture: FormControl<IFacture['numeroFacture']>;
  dateFacture: FormControl<IFacture['dateFacture']>;
  dateEcheance: FormControl<IFacture['dateEcheance']>;
  montantFacture: FormControl<IFacture['montantFacture']>;
  consTot: FormControl<IFacture['consTot']>;
  compteur: FormControl<IFacture['compteur']>;
};

export type FactureFormGroup = FormGroup<FactureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FactureFormService {
  createFactureFormGroup(facture: FactureFormGroupInput = { id: null }): FactureFormGroup {
    const factureRawValue = {
      ...this.getFormDefaults(),
      ...facture,
    };
    return new FormGroup<FactureFormGroupContent>({
      id: new FormControl(
        { value: factureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      numeroFacture: new FormControl(factureRawValue.numeroFacture),
      dateFacture: new FormControl(factureRawValue.dateFacture),
      dateEcheance: new FormControl(factureRawValue.dateEcheance),
      montantFacture: new FormControl(factureRawValue.montantFacture),
      consTot: new FormControl(factureRawValue.consTot),
      compteur: new FormControl(factureRawValue.compteur),
    });
  }

  getFacture(form: FactureFormGroup): IFacture | NewFacture {
    return form.getRawValue() as IFacture | NewFacture;
  }

  resetForm(form: FactureFormGroup, facture: FactureFormGroupInput): void {
    const factureRawValue = { ...this.getFormDefaults(), ...facture };
    form.reset(
      {
        ...factureRawValue,
        id: { value: factureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FactureFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICompteur, NewCompteur } from '../compteur.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICompteur for edit and NewCompteurFormGroupInput for create.
 */
type CompteurFormGroupInput = ICompteur | PartialWithRequiredKeyOf<NewCompteur>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICompteur | NewCompteur> = Omit<T, 'dateDernierAchat'> & {
  dateDernierAchat?: string | null;
};

type CompteurFormRawValue = FormValueOf<ICompteur>;

type NewCompteurFormRawValue = FormValueOf<NewCompteur>;

type CompteurFormDefaults = Pick<NewCompteur, 'id' | 'dateDernierAchat'>;

type CompteurFormGroupContent = {
  id: FormControl<CompteurFormRawValue['id'] | NewCompteur['id']>;
  numero: FormControl<CompteurFormRawValue['numero']>;
  type: FormControl<CompteurFormRawValue['type']>;
  phase: FormControl<CompteurFormRawValue['phase']>;
  dateDernierAchat: FormControl<CompteurFormRawValue['dateDernierAchat']>;
  fabricant: FormControl<CompteurFormRawValue['fabricant']>;
  cumulEnergieMensuelle: FormControl<CompteurFormRawValue['cumulEnergieMensuelle']>;
  client: FormControl<CompteurFormRawValue['client']>;
};

export type CompteurFormGroup = FormGroup<CompteurFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CompteurFormService {
  createCompteurFormGroup(compteur: CompteurFormGroupInput = { id: null }): CompteurFormGroup {
    const compteurRawValue = this.convertCompteurToCompteurRawValue({
      ...this.getFormDefaults(),
      ...compteur,
    });
    return new FormGroup<CompteurFormGroupContent>({
      id: new FormControl(
        { value: compteurRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      numero: new FormControl(compteurRawValue.numero, {
        validators: [Validators.required],
      }),
      type: new FormControl(compteurRawValue.type, {
        validators: [Validators.required],
      }),
      phase: new FormControl(compteurRawValue.phase, {
        validators: [Validators.required],
      }),
      dateDernierAchat: new FormControl(compteurRawValue.dateDernierAchat),
      fabricant: new FormControl(compteurRawValue.fabricant),
      cumulEnergieMensuelle: new FormControl(compteurRawValue.cumulEnergieMensuelle),
      client: new FormControl(compteurRawValue.client),
    });
  }

  getCompteur(form: CompteurFormGroup): ICompteur | NewCompteur {
    return this.convertCompteurRawValueToCompteur(form.getRawValue() as CompteurFormRawValue | NewCompteurFormRawValue);
  }

  resetForm(form: CompteurFormGroup, compteur: CompteurFormGroupInput): void {
    const compteurRawValue = this.convertCompteurToCompteurRawValue({ ...this.getFormDefaults(), ...compteur });
    form.reset(
      {
        ...compteurRawValue,
        id: { value: compteurRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CompteurFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateDernierAchat: currentTime,
    };
  }

  private convertCompteurRawValueToCompteur(rawCompteur: CompteurFormRawValue | NewCompteurFormRawValue): ICompteur | NewCompteur {
    return {
      ...rawCompteur,
      dateDernierAchat: dayjs(rawCompteur.dateDernierAchat, DATE_TIME_FORMAT),
    };
  }

  private convertCompteurToCompteurRawValue(
    compteur: ICompteur | (Partial<NewCompteur> & CompteurFormDefaults),
  ): CompteurFormRawValue | PartialWithRequiredKeyOf<NewCompteurFormRawValue> {
    return {
      ...compteur,
      dateDernierAchat: compteur.dateDernierAchat ? compteur.dateDernierAchat.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

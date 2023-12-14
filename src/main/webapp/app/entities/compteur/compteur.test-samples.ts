import dayjs from 'dayjs/esm';

import { ICompteur, NewCompteur } from './compteur.model';

export const sampleWithRequiredData: ICompteur = {
  id: 29071,
  numero: 'hôte assez',
  type: 'paf dans',
  phase: 1065,
};

export const sampleWithPartialData: ICompteur = {
  id: 17210,
  numero: 'cuicui quant à',
  type: 'de peur que équipe',
  phase: 24055,
  cumulEnergieMensuelle: 20540.41,
};

export const sampleWithFullData: ICompteur = {
  id: 11629,
  numero: 'équipe de recherche',
  type: 'grrr éclaircir',
  phase: 3527,
  dateDernierAchat: dayjs('2023-12-08T14:00'),
  fabricant: 'tant que',
  cumulEnergieMensuelle: 17943.19,
};

export const sampleWithNewData: NewCompteur = {
  numero: 'circulaire sans que trop',
  type: 'esquisser pin-pon encore',
  phase: 17145,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

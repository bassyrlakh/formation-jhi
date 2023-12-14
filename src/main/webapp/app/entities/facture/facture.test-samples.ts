import dayjs from 'dayjs/esm';

import { IFacture, NewFacture } from './facture.model';

export const sampleWithRequiredData: IFacture = {
  id: 15923,
};

export const sampleWithPartialData: IFacture = {
  id: 28918,
  numeroFacture: 'athlète',
  dateEcheance: dayjs('2023-12-07'),
  montantFacture: 30732.76,
};

export const sampleWithFullData: IFacture = {
  id: 10970,
  numeroFacture: 'orange tandis que',
  dateFacture: dayjs('2023-12-07'),
  dateEcheance: dayjs('2023-12-08'),
  montantFacture: 13710.48,
  consTot: 19416.28,
};

export const sampleWithNewData: NewFacture = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

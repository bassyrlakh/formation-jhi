import dayjs from 'dayjs/esm';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 26521,
};

export const sampleWithPartialData: IPayment = {
  id: 30834,
  paymentDate: dayjs('2023-12-08T02:56'),
  paymentMode: 'WAVE',
};

export const sampleWithFullData: IPayment = {
  id: 4920,
  paymentDate: dayjs('2023-12-08T08:42'),
  paymentMode: 'SENELECMONEY',
};

export const sampleWithNewData: NewPayment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

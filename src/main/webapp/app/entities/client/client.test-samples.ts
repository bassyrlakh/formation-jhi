import dayjs from 'dayjs/esm';

import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 31983,
  lastName: 'Caron',
  firstName: 'Gabrielle',
};

export const sampleWithPartialData: IClient = {
  id: 162,
  lastName: 'Faure',
  firstName: 'Élzéar',
  dateOfbirth: dayjs('2023-12-08'),
};

export const sampleWithFullData: IClient = {
  id: 25513,
  lastName: 'Denis',
  firstName: 'Claude',
  dateOfbirth: dayjs('2023-12-08'),
};

export const sampleWithNewData: NewClient = {
  lastName: 'Lemaire',
  firstName: 'Delphine',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

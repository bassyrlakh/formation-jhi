import dayjs from 'dayjs/esm';
import { IFacture } from 'app/entities/facture/facture.model';
import { PaiementMode } from 'app/entities/enumerations/paiement-mode.model';

export interface IPayment {
  id: number;
  paymentDate?: dayjs.Dayjs | null;
  paymentMode?: keyof typeof PaiementMode | null;
  facture?: Pick<IFacture, 'id'> | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };

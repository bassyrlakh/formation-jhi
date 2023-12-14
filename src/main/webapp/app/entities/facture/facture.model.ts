import dayjs from 'dayjs/esm';
import { ICompteur } from 'app/entities/compteur/compteur.model';

export interface IFacture {
  id: number;
  numeroFacture?: string | null;
  dateFacture?: dayjs.Dayjs | null;
  dateEcheance?: dayjs.Dayjs | null;
  montantFacture?: number | null;
  consTot?: number | null;
  compteur?: Pick<ICompteur, 'id'> | null;
}

export type NewFacture = Omit<IFacture, 'id'> & { id: null };

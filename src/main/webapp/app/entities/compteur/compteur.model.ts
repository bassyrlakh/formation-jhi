import dayjs from 'dayjs/esm';
import { IClient } from 'app/entities/client/client.model';

export interface ICompteur {
  id: number;
  numero?: string | null;
  type?: string | null;
  phase?: number | null;
  dateDernierAchat?: dayjs.Dayjs | null;
  fabricant?: string | null;
  cumulEnergieMensuelle?: number | null;
  client?: Pick<IClient, 'id'> | null;
}

export type NewCompteur = Omit<ICompteur, 'id'> & { id: null };

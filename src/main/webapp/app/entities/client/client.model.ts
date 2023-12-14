import dayjs from 'dayjs/esm';

export interface IClient {
  id: number;
  lastName?: string | null;
  firstName?: string | null;
  dateOfbirth?: dayjs.Dayjs | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };

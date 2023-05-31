import { IAdresse } from 'app/shared/model/adresse.model';

export interface IClient {
  id?: number;
  nom?: string | null;
  postnom?: string | null;
  prenom?: string | null;
  numero?: string | null;
  email?: string | null;
  adresse?: IAdresse | null;
}

export const defaultValue: Readonly<IClient> = {};

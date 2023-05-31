import { IAdresse } from 'app/shared/model/adresse.model';

export interface IFournisseur {
  id?: number;
  nom?: string | null;
  email?: string | null;
  telephone?: string | null;
  adresse?: IAdresse | null;
}

export const defaultValue: Readonly<IFournisseur> = {};

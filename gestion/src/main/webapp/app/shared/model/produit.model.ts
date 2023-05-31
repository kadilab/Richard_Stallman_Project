import { ICategorie } from 'app/shared/model/categorie.model';

export interface IProduit {
  id?: number;
  reference?: string | null;
  description?: string | null;
  prix?: number | null;
  quantiteStock?: number | null;
  seuilReapprovisionnement?: number | null;
  categorie?: ICategorie | null;
}

export const defaultValue: Readonly<IProduit> = {};

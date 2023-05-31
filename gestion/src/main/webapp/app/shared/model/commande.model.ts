import dayjs from 'dayjs';
import { IProduitCommande } from 'app/shared/model/produit-commande.model';
import { IClient } from 'app/shared/model/client.model';
import { STATUS } from 'app/shared/model/enumerations/status.model';

export interface ICommande {
  id?: number;
  date?: string | null;
  remise?: number | null;
  statut?: STATUS | null;
  produitCommandes?: IProduitCommande[] | null;
  client?: IClient | null;
}

export const defaultValue: Readonly<ICommande> = {};

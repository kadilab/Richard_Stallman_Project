import { IProduit } from 'app/shared/model/produit.model';
import { ICommande } from 'app/shared/model/commande.model';

export interface IProduitCommande {
  id?: number;
  quantite?: number | null;
  produit?: IProduit | null;
  commande?: ICommande | null;
}

export const defaultValue: Readonly<IProduitCommande> = {};

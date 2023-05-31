import { IProduit } from 'app/shared/model/produit.model';
import { ICommandeFournisseur } from 'app/shared/model/commande-fournisseur.model';

export interface ILigneCommandeFournisseur {
  id?: number;
  quantite?: number | null;
  produit?: IProduit | null;
  commandeFournisseur?: ICommandeFournisseur | null;
}

export const defaultValue: Readonly<ILigneCommandeFournisseur> = {};

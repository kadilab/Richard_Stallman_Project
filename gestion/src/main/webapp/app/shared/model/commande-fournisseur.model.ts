import dayjs from 'dayjs';
import { ILigneCommandeFournisseur } from 'app/shared/model/ligne-commande-fournisseur.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

export interface ICommandeFournisseur {
  id?: number;
  numero?: string | null;
  dateDebut?: string | null;
  dateFin?: string | null;
  statut?: string | null;
  lignecommandes?: ILigneCommandeFournisseur[] | null;
  fournisseur?: IFournisseur | null;
}

export const defaultValue: Readonly<ICommandeFournisseur> = {};

export interface IUtilisateur {
  id?: number;
  nom?: string | null;
  adresse?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IUtilisateur> = {};

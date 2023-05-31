export interface IAdresse {
  id?: number;
  numero?: string | null;
  rue?: string | null;
  commune?: string | null;
  ville?: string | null;
  pays?: string | null;
}

export const defaultValue: Readonly<IAdresse> = {};

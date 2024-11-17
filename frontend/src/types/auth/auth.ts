export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface signInType {
  title?: string;
}

// Định nghĩa rolesType
export type RolesType = 'USER' | 'ADMIN' | 'TEACHER';

// Định nghĩa interface loginResponseType
export interface LoginResponseType {
  accessToken: string;
  refreshToken: string;
  userId: number;
  roles: RolesType[];
}

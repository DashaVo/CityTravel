export type UserRole = 'Admin' | 'ContentManager' | 'User' | 'Guest';
export interface IUserProfile {
    id: string;
    name: string;
    userName: string;
    avatarSrc: string;
    phoneNumber: string;
    email: string;
    gender: string;
    accessToken: string;
    birthday: string;
    role:UserRole;
}


export interface IUserSearchProperties {
    name: string;
    email: string;
    gender: string;
}

export interface IUserUpdate {
  name: string;
  email: string;
  avatarSrc: string;
  userName:string;
}
export interface IUpdateUserData {
  name: string;
  email: string;
  avatarSrc: string;
  userName:string;
}

export interface IMenuItem {
  url: string;
  title: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  isPersistent: boolean;
}

export interface RegisterRequest{
  name:string,
  gender: string,
  avatarSrc: string,
  userName:string,
  password:string,
  email:string,
}

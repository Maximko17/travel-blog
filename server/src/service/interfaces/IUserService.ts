export interface IUserService {
   signUp(userInfo: IUserSignUpInfo): void;
   logIn(): void;
}

export interface IUserSignUpInfo {
   login: string;
   password: string;
   confirmPassword: string;
}

export interface IUserService {
   signUp(
      userInfo: IUserSignUpInfo
   ): Promise<{ accessToken: string; refreshToken: string }>;
   logIn(
      userInfo: IUserLogInInfo
   ): Promise<{ accessToken: string; refreshToken: string }>;
}

export interface IUserSignUpInfo {
   login: string;
   password: string;
   confirmPassword: string;
}

export interface IUserLogInInfo {
   login: string;
   password: string;
}

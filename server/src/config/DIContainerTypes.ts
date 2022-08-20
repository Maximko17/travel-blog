const DI_TYPES = {
   IUserRepository: Symbol("IUserRepository"),
   IRoleRepository: Symbol("IRoleRepository"),
   ITokenRepository: Symbol("ITokenRepository"),
   IRoleService: Symbol("IRoleService"),
   IUserService: Symbol("IUserService"),
   ITokenService: Symbol("ITokenService"),
   UserController: Symbol("UserController"),
   AppBootstrap: Symbol("AppBootstrap"),
};

export default DI_TYPES;

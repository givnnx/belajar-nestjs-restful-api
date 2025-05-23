export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
}

export class UserResponse {
  username: string;
  name: string;
  token?: string | null;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class updateUserRequest {
  name?: string;
  password?: string;
}

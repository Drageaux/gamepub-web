import { User } from '@auth0/auth0-angular';

export class AuthUser extends User {
  public get username() {
    return this.nickname;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // TODO: use dynamic user ID and implement login
  private _id: string = '61e6d8b86af89e21c0608aa8';

  constructor() {}

  public get id() {
    return this._id;
  }
}

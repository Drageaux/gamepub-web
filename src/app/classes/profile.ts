export interface Profile {
  _id?: string;
  email: string;
  username?: string;
  app_metadata?: any;
  user_metadata?: any;
  [key: string]: any;
}

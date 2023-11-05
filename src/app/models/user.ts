export class User {
  usern: string;
  pass: string;
  email: string;

  constructor(usern: string, pass: string, email: string) {
    this.usern = usern;
    this.pass = pass;
    this.email = email;
  }
}

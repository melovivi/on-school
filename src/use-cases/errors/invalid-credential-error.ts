export class InvalidCredentialError extends Error {
  constructor() {
    super('Username or password is incorrect')
  }
}

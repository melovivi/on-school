export class InvalidPermissionError extends Error {
  constructor() {
    super('You do not have permission to access this resource')
  }
}

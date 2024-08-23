export class ResourceNotFoundError extends Error {
  constructor(recurso: string) {
    super(`${recurso} não encontrado`)
  }
}

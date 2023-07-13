export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check in ca only validate until 20 minutes late')
  }
}

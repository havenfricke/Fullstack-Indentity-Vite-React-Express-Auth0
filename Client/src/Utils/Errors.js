export class RouterError extends Error {
    constructor(statusText, message, status = 404) {
      super(message)
      this.data = message
      this.status = status
      this.statusText = statusText
    }
  }
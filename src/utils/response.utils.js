export class Response {
    constructor({ message = "", error = "", success = true, data = null }) {
      this.message = message;
      this.error = error;
      this.success = success;
      this.data = data;
      if (this.error) {
        this.success = false;
        if (!this.message) {
          this.message = this.error;
        }
      } else if (this.data) {
        this.success = true;
      }
    }
  }
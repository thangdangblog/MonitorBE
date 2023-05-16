class ServiceActionResult {
    constructor(data = null, success = true, errorCode = 0) {
        this.Data = data;

        if(data) {
            this.Success = true;
        } else {
            this.Success = false;
        }

        this.ErrorCode = errorCode;
    }
}

module.exports = ServiceActionResult;
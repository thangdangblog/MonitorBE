class ServiceActionResult {
    constructor(data = null, success = true, errorCode = 0) {
        this.Data = data;
        this.Success = success;
        this.ErrorCode = errorCode;
    }
}

module.exports = ServiceActionResult;
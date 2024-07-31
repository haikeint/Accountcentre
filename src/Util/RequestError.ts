// Định nghĩa enum HttpStatusCode
export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    MovedPermanently = 301,
    Found = 302,
    NotModified = 304,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}

// Tạo dictionary với thông điệp tương ứng
const httpStatusMessages: { [key in HttpStatusCode]: string } = {
    [HttpStatusCode.OK]: 'Request succeeded.',
    [HttpStatusCode.Created]: 'Resource created successfully.',
    [HttpStatusCode.Accepted]: 'Request accepted but not yet processed.',
    [HttpStatusCode.NoContent]: 'No content to send for this request.',
    [HttpStatusCode.MovedPermanently]: 'Resource has been moved permanently.',
    [HttpStatusCode.Found]: 'Resource found at a different URI.',
    [HttpStatusCode.NotModified]: 'Resource not modified.',
    [HttpStatusCode.BadRequest]: 'Bad request.',
    [HttpStatusCode.Unauthorized]: 'Tài khoản hoặc mật khẩu không đúng !',
    [HttpStatusCode.Forbidden]: 'Tick lại recaptcha.',
    [HttpStatusCode.NotFound]: 'Resource not found.',
    [HttpStatusCode.MethodNotAllowed]: 'Method not allowed.',
    [HttpStatusCode.Conflict]: 'Tài khoản đã tồn tại !',
    [HttpStatusCode.InternalServerError]: 'Lỗi máy chủ.',
    [HttpStatusCode.NotImplemented]: 'Functionality not implemented.',
    [HttpStatusCode.BadGateway]: 'Bad gateway.',
    [HttpStatusCode.ServiceUnavailable]: 'Service unavailable.',
    [HttpStatusCode.GatewayTimeout]: 'Gateway timeout.'
}

// Hàm xử lý mã trạng thái HTTP
export const handleResponse = (status: HttpStatusCode) => {
    return httpStatusMessages[status] || null
}

// Ví dụ sử dụng
// handleResponse(HttpStatusCode.OK)
// handleResponse(HttpStatusCode.NotFound)
// handleResponse(999 as HttpStatusCode) // Thử với mã trạng thái không xác định

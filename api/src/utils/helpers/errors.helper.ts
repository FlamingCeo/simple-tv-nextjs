class ErrorResponses {
  static getErrorMessage(code: number): string {
    switch (code) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 500:
        return "Internal Server Error";
      case 302: 
        return "Content Found"
      case 301: 
        return "Content Already exists"
      default:
        return "Unknown Error";
    }
  }

  static getErrorResponse(code: number): { code: number; message: string} {
    const message = ErrorResponses.getErrorMessage(code);
    return { code, message };
  }

  static getCustomErrorResponse(code: number, customMessage: string, errors: any = null): { code: number,  message: string, errors: any } {
    return { code, message: customMessage, errors: errors };
  }

  static return400(res: any, obj: any = null){
    return res.status(400).json(ErrorResponses.getCustomErrorResponse(400, "Validation Error!", obj));
  }
  static return401(res: any, obj: any = null){
    return res.status(401).json(ErrorResponses.getCustomErrorResponse(401, "Unauthorized!", obj));
  }

  static return404(res: any, obj: any = null){
    return res.status(404).json(ErrorResponses.getCustomErrorResponse(404, "Not Found!", obj));
  }

	static return500(res: any, obj: any = null){
		return res.status(500).json(ErrorResponses.getCustomErrorResponse(500, "Internal Server Error", obj));
	}
  static return403(res: any, obj: any = null){
    return res.status(403).json(ErrorResponses.getCustomErrorResponse(403, "Forbidden", obj));
  }
  
}

export {ErrorResponses};

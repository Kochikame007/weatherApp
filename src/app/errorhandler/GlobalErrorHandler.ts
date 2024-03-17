import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
// GlobalErrorHandler class definition
export class GlobalErrorHandler implements ErrorHandler {


    handleError(error: any): void {

        if (error instanceof HttpErrorResponse) {
            // Handle server-side error (e.g., log, show user-friendly message, etc.)
            console.error('Server-side error:', error);
        } else {
            // Handle UI error (e.g., log, show user-friendly message, etc.)
            console.error('UI error:', error);
        }

    }
}

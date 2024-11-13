import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ErrorHandler {
    static handleError(error: HttpErrorResponse | any) {
        let errorMessage: string;
        if (error instanceof HttpErrorResponse) {
            errorMessage = `Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText}`;
        } else {
            errorMessage = error.toString();
        }
        console.error(errorMessage); 
        return throwError(() => new Error(errorMessage));
    }
}

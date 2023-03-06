import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerMejoradoService } from "../spinner/spinner-mejorado/spinner-mejorado.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinerService: SpinnerMejoradoService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinerService.show();
        return next.handle(req).pipe(
            finalize(() => this.spinerService.hide()));
    }
}
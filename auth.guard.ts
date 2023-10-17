import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ClientService } from "src/app/services/client.service";



@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    constructor(private router:Router, private cookieService: CookieService, private clientService:ClientService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isNotAuthenticated = true;
        const token = this.cookieService.get('jwtToken');
        if(token){
           this.router.navigate(['home-page']);
           isNotAuthenticated = false;
        }
        else {
            isNotAuthenticated = true;
        }
        return isNotAuthenticated;
    }
   
}
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class ReqInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                public alertController: AlertController,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let alert;
        const updatedRequest = request.clone({
            headers: request.headers.set('Authorization', this.authService.token)
          });
        return next.handle(request).pipe(
            tap(
                async (event: any) => {
                },
                async (error) => {
                    switch (error.status) {
                        case 401:
                            this.router.navigate(['/login']);
                        break;

                        case 0:
                            alert = await this.alertController.create({
                                header: 'Connexion échouée !',
                                subHeader: 'Votre téléphone n\'est pas connecté.',
                                message: 'Veuillez vous connecter et réessayer svp!',
                                buttons: ['OK']
                              });

                              await alert.present();
                        break;
                        default:
                            break;
                    }
                }
            )
        );
    }
}

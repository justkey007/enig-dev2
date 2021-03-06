import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { host } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private presenceService: PresenceService,
              private router: Router,
              private alertController: AlertController) { }

  token;
  isLogin = false;
  loginApi = 'animators/login';
  logoutApi = 'animators/logout';

  checklogin(login: string, password: string) {
    return this.httpClient.post(host + this.loginApi, {
      username: login,
      password: password
    }).pipe(
      tap(
        async(event: any) => {
          if (event.id) {
            this.token = event.id;
            this.isLogin = true;
            if (!this.presenceService.hasSetPresence()) {
              this.router.navigateByUrl('/presence');
            } else {
              this.router.navigateByUrl('/tabs/add-client');
            }
          }
        },
        async(error) => {
          if (error.status === 401) {
                const alert = await this.alertController.create({
                header: 'Connexion échouée !',
                subHeader: 'Identifiant ou mot de passe incorrect.',
                message: 'Veuillez réessayer svp!',
                buttons: ['OK']
              });
            await alert.present();
          }
        }
      )
    );
  }

  logout() {
    this.httpClient.post(host + this.logoutApi, null);
    this.token = null;
    this.isLogin = false;
    localStorage.removeItem('currentPresenceDay');
    this.router.navigateByUrl('/login');
  }

}

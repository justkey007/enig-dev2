import { AfterViewInit, Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closing',
  templateUrl: 'closing.page.html',
  styleUrls: ['closing.page.scss']
})
export class ClosingPage implements AfterViewInit{
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async ngAfterViewInit() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Vous êtes entrain de vous déconnecter.',
      buttons: [
        {
          text: 'Retourner',
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/tabs');
          }
        }, {
          text: 'Déconnexion',
          cssClass: 'primary',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}

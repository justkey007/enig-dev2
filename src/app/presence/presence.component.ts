import { Component, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PresenceService } from '../core/services/presence.service';


@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements AfterViewInit {
  constructor(
      private camera: Camera,
      private router: Router,
      private presenceService: PresenceService,
      private authService: AuthService,
      private alertController: AlertController
  ) {}

  async ngAfterViewInit() {
      const alert = await this.alertController.create({
        header: 'Marquer votre présence par un selfie',
        message: 'Êtes-vous prêt(e) pour marquer votre présence ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              this.authService.logout();
            }
          }, {
            text: 'Oui',
            cssClass: 'primary',
            handler: () => {
              this.takePicture();
            }
          }
        ]
      });

      await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      // send presence
      this.presenceService.setPresenceDay(base64Image).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'votre présence a été bien marquée !',
            message: 'Bonne journée !',
            buttons: ['OK']
          });

          alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: "une erreur s'est produite",
            message: 'veuillez réessayer svp !',
            buttons: ['OK']
          });

          alert.present();
        }
      );
    }, async (err) => {
      const alert = await this.alertController.create({
        header: "Une erreur s'est produite",
        message: 'veuillez réessayer svp !',
        buttons: ['OK']
      });

      alert.present();
    });
  }
}

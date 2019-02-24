import { Component, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PresenceService } from '../core/services/presence.service';


@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements AfterViewInit {
  loading;
  constructor(
      private camera: Camera,
      private router: Router,
      public loadingController: LoadingController,
      private presenceService: PresenceService,
      private authService: AuthService,
      private alertController: AlertController
  ) {
  }


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

  async takePicture() {
    this.loading = await this.loadingController.create({
      message: 'Veuillez patientez...',
    });
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // this.loading.present();
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      // send presence
      this.presenceService.setPresenceDay(imageData).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'Votre présence a été bien marquée !',
            message: 'Bonne journée !',
            buttons: ['OK']
          });
          // this.loading.dismiss();
          alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: "Une erreur s'est produite",
            message: 'Veuillez réessayer svp !',
            buttons: [{
              text: 'Réessayer',
              handler: () => {
                this.takePicture();
              }
            }]
          });
          // this.loading.dismiss();
          alert.present();
        }
      );
    }, async (err) => {
      const alert = await this.alertController.create({
        header: "Problème de géolocalisation",
        message: 'Veuillez vérifier si votre GPS est activé !',
        buttons: [{
          text: 'Réessayer',
          handler: () => {
            this.takePicture();
          }
        }]
      });

      alert.present();
    });
  }
}

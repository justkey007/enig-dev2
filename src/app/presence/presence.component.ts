import { Component, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements AfterViewInit {
  constructor(
      private camera: Camera,
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
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Oui',
            cssClass: 'primary',
            handler: () => {
              this.takePicture();
              console.log('Confirm Okay');
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
    // this.image = base64Image;
    }, (err) => {
    // Handle error
    });
  }
}

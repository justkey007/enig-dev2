import { Component, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements AfterViewInit {
  constructor(
      private camera: Camera,
      private domSatinizer: DomSanitizer,
      private alertController: AlertController
  ) {}
  
  image;

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
      quality: 710,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image = imageData;
    // this.image = this.domSatinizer.bypassSecurityTrustUrl(base64Image);
    // document.querySelector('.iimage').appendChild(this.image);
    }, (err) => {
    // Handle error
    });
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { IEnreg, ActivitiesService } from '../core/services/activities.service';
declare var Quagga;
@Component({
  selector: 'app-add-client',
  templateUrl: 'add-client.page.html',
  styleUrls: ['add-client.page.scss']
})
export class AddClientPage implements AfterViewInit{
  constructor(
    private alertController: AlertController,
    private customerService: ActivitiesService,
    private loadingController: LoadingController,
    private camera: Camera,
  ) {
  }

  loading;
  currentCustomer: IEnreg;

  async ngAfterViewInit() {
    this.loading = await this.loadingController.create({
      message: 'Traitement en cours ...',
    });

  }

  async scanSim() {
    const alert = await this.alertController.create({
      header: "Num. série carte sim",
      message: 'Scanner le numéro de série de la carte sim !',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.takePicture(1);
        }
      }]
    });

    alert.present();
  }

  async takePicture(takeDoc: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // this.loading.present();
    this.camera.getPicture(options).then(
    async (imageData) => {
      const base64Image = 'data:image/jpg;base64,' + imageData;

    this.decodeImage(base64Image,
      async (code) => {
        const alert = await this.alertController.create({
          header: code,
          message: 'Confirmer le code svp !',
          buttons: [{
            text: 'Le code est correct',
            handler: () => {
              if (takeDoc === 1) {
                this.currentCustomer.numSerie = code;
              }

              this.currentCustomer.cin = '111';
              this.currentCustomer.contrat = 'KILO4444';
              // test
              this.customerService.addCustomer(this.currentCustomer);
              // this.currentCustomer = null;
              alert.dismiss();
            }
          }]
        });
        alert.present();
      },
      async () => {
        const alert = await this.alertController.create({
          header: 'Code illisible',
          message: 'Veuillez réessayer ou saisie manuelle!',
          buttons: [{
              text: 'Réessayer',
              handler: () => {
                if (takeDoc === 1) {
                  this.scanSim();
                }
              }
            },
            {
              text: 'Saisir',
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      }

    );
    },
    async (err) => {
      const alert = await this.alertController.create({
        header: "Une erreur s'est produite",
        message: "Nous n'avons pas pu accéder à votre caméra",
        buttons: [{
            text: 'Réessayer',
            handler: () => {
              if (takeDoc === 1) {
                this.scanSim();
              }
            }
          },
          {
            text: 'Annuler',
            role: 'cancel'
          }
        ]
      });

      alert.present();
    });
  }

  decodeImage(image: string, callback: Function, error: Function) {
    Quagga.decodeSingle({
      decoder: {
          readers: [
            "code_128_reader", "ean_reader", "ean_8_reader",
            "code_93_reader", "codabar_reader", "code_39_reader", "code_39_vin_reader"
          ] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: image // or 'data:image/jpg;base64,' + data
    }, (result) => {
        if (result.codeResult) {
           callback(result.codeResult.code);
        } else {
            error();
        }
    });
  }
}

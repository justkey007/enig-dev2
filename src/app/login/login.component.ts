import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router ) { }

  public login;
  public password;

  loading;

  ngOnInit() {
    if (this.authService.isLogin) {
      this.router.navigateByUrl('/tabs');
    }
  }

  async checkLogin(login, password) {
    if (login.length === 0 || password.length === 0) {
      return;
    }

    this.loading = await this.loadingController.create({
      message: 'Connexion en cours...',
    });

    this.loading.present();

    await this.authService.checklogin(login, password).subscribe(
      data => {
        this.loading.dismiss();
      },
      async (error) => {
        this.loading.dismiss();
      });
  }

}

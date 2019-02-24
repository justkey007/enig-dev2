import { Injectable } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(
    // private geolocation: Geolocation
  ) {}

  setPresenceDay() {
    const date = new Date();
    localStorage.setItem('currentPresenceDay', date.toDateString());
  }

  hasSetPresence() {
    const d = localStorage.getItem('currentPresenceDay');
    if (d && d === new Date().toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  getLocation() {
    // this.geolocation.getCurrentPosition().then(
    //   (resp) => resp.coords
    //   );
  }

}

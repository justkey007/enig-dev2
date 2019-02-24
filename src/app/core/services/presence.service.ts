import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { host, uploadUrl } from 'src/environments/environment';
import { imagetoblob } from '../utils/formdata';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiPresence = 'presences';
  private uploadPresenceUrl = uploadUrl + 'users/upload';
  private location: Geoposition['coords'];
  constructor(
    private geolocation: Geolocation,
    private httpClient: HttpClient
  ) {
  }

  setPresenceDay(photo: string, ) {
    const date = new Date();
    localStorage.setItem('currentPresenceDay', date.toDateString());

    const formData = new FormData();
    formData.append("file", imagetoblob(photo, true));
    const data = {
      date: date,
      location: {
        lat: this.location.latitude,
        lng: this.location.longitude
      },
      photo_url: null
    };

    this.httpClient.post(this.uploadPresenceUrl, formData).subscribe(
      (response: any) => {
        data.photo_url = response.result.files.name;
      }
    );
    return this.httpClient.post(host + this.apiPresence, data);
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
    this.geolocation.getCurrentPosition().then(
      (resp) => this.location = resp.coords,
      (error) => {
        console.log('Error getting location', error);
      }
    );
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor() {}

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

}

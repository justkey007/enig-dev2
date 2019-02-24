import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenceComponent } from './presence.component';
import { PresenceRoutingModule } from './presence-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PresenceComponent],
  imports: [
    CommonModule,
    PresenceRoutingModule,
    IonicModule.forRoot()
  ]
})
export class PresenceModule { }

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddClientPage } from './add-client.page';
import { EditNumComponent } from './edit-num/edit-num.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AddClientPage }])
  ],
  declarations: [AddClientPage, EditNumComponent]
})
export class AddClientModule {}

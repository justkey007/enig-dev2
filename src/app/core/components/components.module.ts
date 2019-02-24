import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './button/button.component';

const declarations = [
  ButtonComponent
]
@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    ...declarations
  ]
})
export class ComponentsModule { }

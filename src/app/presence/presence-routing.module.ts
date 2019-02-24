import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PresenceComponent } from './presence.component';

const routes: Routes = [
    { path: '', component: PresenceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PresenceRoutingModule {}

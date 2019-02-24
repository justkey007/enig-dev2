import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'add-client',
        children: [
          {
            path: '',
            loadChildren: '../add-client/add-client.module#AddClientModule'
          }
        ]
      },
      {
        path: 'day-activities',
        children: [
          {
            path: '',
            loadChildren: '../day-activities/day-activities.module#DayActivitiesModule'
          }
        ]
      },
      {
        path: 'closing',
        children: [
          {
            path: '',
            loadChildren: '../closing/closing.module#ClosingModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/add-client',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/add-client',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

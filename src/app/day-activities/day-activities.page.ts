import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../core/services/activities.service';

@Component({
  selector: 'app-day-activities',
  templateUrl: 'day-activities.page.html',
  styleUrls: ['day-activities.page.scss']
})
export class DayActivitiesPage implements OnInit {

  public customers = [];

    constructor(
      private customersService: ActivitiesService
    ) {}

    ngOnInit() {
      this.customers = this.customersService.getCustomers();
      this.customersService.customers$.subscribe((customer) => {
        this.customers.push(customer);
      });
    }
}

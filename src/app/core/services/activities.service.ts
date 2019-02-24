import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

constructor() { }

private entries: IEnreg[] = [];

public customers$: EventEmitter<IEnreg> = new EventEmitter();

addCustomer(customer: IEnreg) {
  this.entries.push(customer);
  this.customers$.emit(customer);
}

getCustomers() {
  return this.entries;
}

}

export interface IEnreg {
  numSerie?: string;
  contrat?: string;
  cin?: string;
}

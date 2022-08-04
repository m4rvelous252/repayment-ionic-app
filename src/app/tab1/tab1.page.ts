import { Component } from '@angular/core';
import { PersonService } from '../services/person.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  name: string;
  amountGiven: number;

  constructor(private personService: PersonService, private alertService: AlertService) {}

  onAddPerson() {
    if(!this.name || this.name === ''){
      return this.alertService.showAlert('Name is required', 2000)
    }

    if(!this.amountGiven || this.amountGiven === 0){
      return this.alertService.showAlert('Please enter the amount that was given', 2000)
    }

    const newPerson = {
      name: this.name,
      gifted: this.amountGiven,
      givenBack: 0
    }
    this.personService.addPerson(newPerson).subscribe( async (res) => {
      this.alertService.showAlert(`${newPerson.name} has been added!`, 2000)
    })

    this.name = '';
    this.amountGiven = 0;
  }
}

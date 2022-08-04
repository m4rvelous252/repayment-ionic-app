import { Component, Input } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../services/person.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  search: string;
  people: Person[] = []
  peopleList: Person[] = []

  constructor(private personService: PersonService, private alertService: AlertService) {}

  ngOnInit() {
    this.personService.getPeople().subscribe(people => {
      this.peopleList = people
      this.people = this.peopleList
      console.log(this.peopleList)
    })
  }

  giveBack(person: Person) {
    this.personService.updatePerson(person).subscribe(async (res) => {
      this.alertService.showAlert(`${person.name} has been given back! ${person.givenBack}VND`, 2000)

      this.personService.getPeople().subscribe(people => {
        this.peopleList = people
        this.people = this.peopleList
      })
    })
  }

  onSearch() {
    this.people = this.peopleList.filter(person => {
      return person.name.toLowerCase().includes(this.search.toLowerCase())
    })
  }

}

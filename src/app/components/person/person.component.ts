import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { Person } from 'src/app/Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  @ViewChild('input') inputElement;
  @Output() onGiveBack: EventEmitter<Person> = new EventEmitter<Person>();

  givenBack: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.givenBack = this.person.givenBack || undefined;
  }

  onGiveBackClick(){
    if(!this.givenBack || this.givenBack === 0){
      return
    }

    if(this.givenBack === this.person.givenBack){
      return
    }

    const newPerson = {
      ...this.person,
      givenBack: this.givenBack
    }
    this.onGiveBack.emit(newPerson)
  }

  getBgColor(){
    if(this.person.givenBack){
      return '#f5f5f5'
    }
    return '#fff'
  }

  onExpand(){
    //set focus on input element after expanding the person card
    this.inputElement.el.children[0].focus() // still not working
  }
}


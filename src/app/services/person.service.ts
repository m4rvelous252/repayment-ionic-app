import { Injectable } from '@angular/core';
import { Observable, defer, from } from 'rxjs';
import { Person } from '../Person';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // private apiURL = 'http://localhost:3000/people';

  constructor(private firestore: AngularFirestore) { }

  getPeople(): Observable<Person[]> {
    return this.firestore.collection<Person>('people').valueChanges();
  }

  addPerson(person: Person): Observable<any> {
    return defer(() => from(this.firestore.collection('people').add(person).then(ref => {
      const personWithID ={
        ...person,
        id: ref.id
      }
      return this.firestore.doc('people/' + ref.id).update(personWithID);
    }))) ;
  }

  updatePerson(person: Person): Observable<any> {
    return defer(() => from(this.firestore.doc('people/' + person.id).update(person))) ;
  }
}

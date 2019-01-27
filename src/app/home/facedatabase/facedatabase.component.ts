import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Face2Component } from '../face2/face2.component';

@Component({
  selector: 'app-facedatabase',
  templateUrl: './facedatabase.component.html',
  styleUrls: ['./facedatabase.component.css']
})
export class FacedatabaseComponent implements OnInit {

  items: Observable<any[]>;
  itemRef: AngularFireList<any>;
  data: any;
  confirm: false;
  constructor(db: AngularFireDatabase) {
    this.itemRef = db.list('user');
    this.items = this.itemRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload, ...c.payload.val() }))));
   }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
  
    console.log(f.value.nom);
    this.data = {
      nom: f.value.fname,
      prenom: f.value.lname,
      gender: f.value.gender,
      age: f.value.age,
      hair: f.value.hair,
      glasses: f.value.glasses,
      imgPath: f.value.imgPath
    };

    this.itemRef.push(this.data);


  }


}

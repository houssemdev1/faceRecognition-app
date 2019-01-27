import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CreateuserService {
userList: AngularFireList<any>;
public nom; prenom; imageUrl; mail; tel;
  constructor(private firedb: AngularFireDatabase) { }

  insertuser(nom, prenom, imageUrl, mail, pwd) {
    this.firedb.list('users').push({
      nom: nom,
      prenom: prenom,
      imageUrl: imageUrl,
      mail: mail,
      password: pwd
    });
  }
}

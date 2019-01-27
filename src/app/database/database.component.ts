import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CreateuserService } from '../createuser.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component( {
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;
  public captures;
  public Attribute;
  image: Observable<string>;
  task: AngularFireUploadTask;
  storageRef: AngularFireStorageReference;
  downloadURL: Observable<string>;
  i  = Math.floor(Math.random() * 10);
  name: string; lastname: string; email: string; pass: string;
  constructor( private store: AngularFireStorage, public newitem: CreateuserService, private router: Router ) {

   }

   ngOnInit() {
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      });
    }

  }
  public send() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 488, 336);
    this.captures = (this.canvas.nativeElement.toDataURL("image/png"));
    this.video.nativeElement.pause();
    console.log(this.captures);
    const blob = this.makeblob(this.captures);
    this.storageRef = this.store.ref("images/" + (this.i) + ".jpg");
    this.storageRef.put(blob);
  }
  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
  getvalues(nom: string, prenom: string, mail: string, pwd: string) {
    this.name = nom;
    this.lastname = prenom;
    this.email = mail;
    this.pass = pwd;
    this.storageRef.getDownloadURL().subscribe(
      url => {
        this.image = url;
        console.log(this.image);
        this.newitem.insertuser( this.name, this.lastname , url, this.email, this.pass);
        this.router.navigate(['loginwithface']);
      });

  }
}

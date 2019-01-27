import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { async } from 'q';
import {DataService} from '../data.service';
import {CompareService} from '../compare.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-loginwithface',
  templateUrl: './loginwithface.component.html',
  styleUrls: ['./loginwithface.component.css']
})
export class LoginwithfaceComponent implements OnInit {

  imageUrl1: string;
  imageUrl2: string;
  personnes1: any = [];
  personnes2: any = [];
  comparisation: any = [];
  N_requestVerify;

  @ViewChild('visualization') visualization: ElementRef;
  @ViewChild('img') img: ElementRef;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  @ViewChild('visualization2') visualization2: ElementRef;
  @ViewChild('img2') img2: ElementRef;

  private context: CanvasRenderingContext2D;
  private element: HTMLImageElement;

  private context2: CanvasRenderingContext2D;
  private element2: HTMLImageElement;

  photo;
  src: string;
  src2: string;
  imgWidth: number;
  imgHeight: number;
  raduis: number;
  isIdentical;
  personTrue;
  j;
  compIdFace;
  IdFace1: string;
  IdFace2: string;
  imgTab: any = [];
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  NbrUser;
  isloding = false;

  constructor( private store: AngularFireStorage , private dataService: DataService ,
    private dataVerify: CompareService, public router: Router , db: AngularFireDatabase) {


    this.itemsRef = db.list('users');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.imgWidth = 600;
    this.imgHeight = 480;
  }

  afterLoading() {

    this.element = this.img.nativeElement;
    this.element2 = this.img2.nativeElement;


    console.log('raduis est' + this.raduis);
    console.log('largeur de l\'img :' + this.element.width);
    console.log('hauteur de l\'img :' + this.element.height);




    this.context.clearRect(0, 0, this.imgWidth, this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element);
    this.context.drawImage(this.element, 0, 0, this.imgWidth, this.imgHeight);

    this.context2.clearRect(0, 0, this.imgWidth, this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element2);
    this.context2.drawImage(this.element2, 0, 0, this.imgWidth, this.imgHeight);

  }

  verifyTwoId(id1, id2) {




    this.dataVerify.compare(id1, id2).subscribe(data => {

      this.comparisation = data.json();


      this.compIdFace = (this.compIdFace || this.comparisation.isIdentical);


      if (this.compIdFace) {
        this.isloding = false;
        this.router.navigate(['home']);
      } else if ((this.N_requestVerify === this.NbrUser)) {
        this.isloding = false;
        this.router.navigate(['createAccount']);
      }
      console.log('connexion' + this.compIdFace);
      console.log('nbr Request  ' + this.N_requestVerify);
      console.log('nbr user  ' + this.NbrUser);
      this.N_requestVerify++;

    });



  }

  verify_Id_Src(id1, src2) {

    this.dataService.getPersonAge(src2).subscribe(data => {

      this.personnes2 = data.json();

      const id2 = this.personnes2[0].faceId;

      console.log('id des visages est (getperson) ' + id2);

      this.verifyTwoId(id1, id2);

    });
  }


  verifyPersonne(src, src2: string) {


    this.dataService.getPersonAge(src).subscribe(data => {

      this.personnes1 = data.json();

      const id1 = this.personnes1[0].faceId;

      console.log('id des visages est (getperson) ' + this.IdFace1);

      this.verify_Id_Src(id1, src2);

    });

  }

  verifyTabImg() {


    this.picImgCam();
    this.N_requestVerify = 1;
    this.dataService.getPersonneCam(this.photo).subscribe(data => {
      this.isloding = true;
        this.N_requestVerify = 1;
        const personne = data.json();
        const id       = personne[0].faceId;
        console.log(personne);
        this.items.forEach((item: any) => {
          this.NbrUser = item.length;
          for (let index = 0; index < item.length; index++) {
            const img = item[index].imageUrl;
            this.verify_Id_Src(id, img);




          }
        });

        /**/
      });


  }



  // tslint:disable-next-line:use-life-cycle-interface
  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }

  }

  picImgCam() {

    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.photo = (this.canvas.nativeElement.toDataURL('image/png'));
    this.video.nativeElement.pause();
  }



  ngOnInit() {


  }

}

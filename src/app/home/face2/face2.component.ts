import { Component, OnInit, ViewChild } from '@angular/core';
import { FaceRecognitionService } from '../../face-recognition.service';

@Component({
  selector: 'app-face2',
  templateUrl: './face2.component.html',
  styleUrls: ['./face2.component.css']
})
export class Face2Component implements OnInit {
  context: CanvasRenderingContext2D;
  context2: CanvasRenderingContext2D;
  @ViewChild('mycanvas1') mycanvas1;
  @ViewChild('mycanvas2') mycanvas2;
  dataUri;
  personAge: any = [];
  age: boolean;
   gender: boolean;
   headPose: boolean;
   smile: boolean;
   facialHair: boolean;
   glasses: boolean;
   emotion: boolean;
   hair: boolean;
   makeup: boolean;
   occlusion: boolean;
   accessories: boolean;
   blur: boolean;
   exposure: boolean;
   noise: boolean;
   opt: string;
   droprect: Boolean = false;
   widthImg;
   heightImg;
   recTop: string;
   recLeft: string;
   recW: string;
   recH: string;
   personMale;
   personFemale;
   personChildren;
   personNumber;
   percentAnger: number;
  percentFear: number;
  percentHapiness: number;
  percentNeutral: number;
  percentSadeness: number;
  percentSurprise: number;
  public captures: Array<any>;
  public leftRec ;
  public topRec ;
  public  widthRec;
  public heightRec;

  constructor(public face: FaceRecognitionService) {
    this.captures = [];
  }

  ngOnInit() {
    this.context = this.mycanvas1.nativeElement.getContext('2d');
    this.context2 = this.mycanvas2.nativeElement.getContext('2d');
  }
  preview(e: any): void {
    let canvas = this.mycanvas1.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, 600, 400);

    var render = new FileReader();
    render.onload = function(event: any) {
      var img = new Image();
      img.onload = function() {
        context.drawImage(img, 0, 0, 600, 400);
      };
img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  public capture1() {
    this.dataUri = this.mycanvas1.nativeElement.toDataURL('image/png');
    // this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.dataUri);
}

public getData() {
   this.captures = [];

  var anger: number = 0;
  var fear: number = 0;
  var hapiness: number = 0;
  var neutral: number = 0;
  var sadness: number = 0;
  var surprise: number = 0;
  this.percentAnger = 0;
  this.percentFear = 0;
  this.percentHapiness = 0;
  this.percentNeutral = 0;
  this.percentSadeness = 0;
  this.percentSurprise = 0;
  var pAnger = 0;
  var pFear = 0;
 var pHapiness = 0;
 var pNeutral = 0;
  var pSadeness = 0;
  var pSurprise = 0;
   this.personChildren = 0;
   this.personMale = 0;
   this.personFemale = 0;

   let canvas = this.mycanvas1.nativeElement;
    let context = canvas.getContext('2d');

  this.face.scanImage(this.dataUri).subscribe(
    data => { this.personAge = data.json();
      this.personNumber= this.personAge.length;
      console.log(this.personAge);
      for (let i = 0; i < this.personAge.length; i++) {
         pAnger = 0;
         pFear = 0;
         pHapiness = 0;
         pNeutral = 0;
         pSadeness = 0;
         pSurprise = 0;

        anger = anger + this.personAge[i].faceAttributes.emotion.anger;
        pAnger= (this.personAge[i].faceAttributes.emotion.anger)*100;

        fear = fear + (this.personAge[i].faceAttributes.emotion.fear);
        pFear= (this.personAge[i].faceAttributes.emotion.fear)*100;

        hapiness = hapiness + (this.personAge[i].faceAttributes.emotion.happiness);
        pHapiness= (this.personAge[i].faceAttributes.emotion.happiness)*100;

        neutral = neutral + (this.personAge[i].faceAttributes.emotion.neutral);
        pNeutral=(this.personAge[i].faceAttributes.emotion.neutral)*100;

        sadness = sadness + (this.personAge[i].faceAttributes.emotion.sadness);
        pSadeness= (this.personAge[i].faceAttributes.emotion.sadness)*100;

        surprise = surprise + (this.personAge[i].faceAttributes.emotion.surprise);
        pSurprise= (this.personAge[i].faceAttributes.emotion.surprise)*100;

        this.leftRec = this.personAge[i].faceRectangle.left ;
        this.topRec = this.personAge[i].faceRectangle.top;
        this.widthRec = this.personAge[i].faceRectangle.width;
        this.heightRec = this.personAge[i].faceRectangle.height;
        this.context.strokeStyle = '#FF0000';
        this.context.strokeRect(this.leftRec, this.topRec, this.widthRec, this.heightRec);
        this.context.font = '20px Arial';
        this.context.fillStyle = 'red';
        this.context.fillText('Person' + (i + 1), this.leftRec + 10, this.topRec - 10);
        var imgData = context.getImageData(this.leftRec, this.topRec, this.widthRec , this.heightRec );
        this.context2.clearRect(0, 0, this.widthRec, this.heightRec);
         this.context2.putImageData(imgData, 0 , 0 );
         this.captures.push(this.mycanvas2.nativeElement.toDataURL('image/png'));
         this.context2.clearRect(0, 0, this.widthRec, this.heightRec);
         console.log('image:' + this.captures[0]);

        if (this.personAge[i].faceAttributes.gender === 'male') {
          this.personMale = this.personMale + 1;

        }
        if (this.personAge[i].faceAttributes.gender === 'female') {
          this.personFemale = this.personFemale + 1;
        }
        if (this.personAge[i].faceAttributes.age < 17) {
          this.personChildren = this.personChildren + 1;
        }
      }
      console.log('male:' + this.personMale);
        console.log('female:' + this.personFemale);
        this.percentSurprise = (surprise / this.personNumber) * 100;
        console.log(' surprise:' + surprise);
        console.log('numer person:' + this.personNumber);
        console.log('pourcentage surprise:' + this.percentSurprise);
        this.percentAnger = (anger / this.personNumber) * 100;
        console.log('pourcentage anger: an' + this.percentAnger);
        this.percentFear = (fear / this.personNumber) * 100;
        console.log('pourcentage fear;' + this.percentFear);
        this.percentSadeness = (sadness / this.personNumber) * 100;
        console.log('pourcentage sadness:' + this.percentSadeness);
        this.percentNeutral = (neutral / this.personNumber) * 100;
        console.log('pourcentage neutral:' + this.percentNeutral);
        this.percentHapiness = (hapiness / this.personNumber) * 100;
        console.log('pourcentage hapiness:' + this.percentHapiness);
});
}


}

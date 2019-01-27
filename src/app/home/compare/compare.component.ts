import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from '../../compare.service';
import { FaceRecognitionService } from '../../face-recognition.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  dataUri1;
  dataUri2;
  dataFace1;
  dataFace2;
  dataVerify;
  faceId1;
  faceId2;
  isTrue;
  percent;
  context: CanvasRenderingContext2D;
  @ViewChild("mycanvas1") mycanvas1;
  @ViewChild("mycanvas2") mycanvas2;
  constructor(public compare : CompareService,
              public face : FaceRecognitionService ) { }

  preview(e: any): void {
    let canvas= this.mycanvas1.nativeElement;
    let context= canvas.getContext('2d');
    context.clearRect(0,0,300,300);

    var render= new FileReader();
    render.onload = function(event:any){
      var img = new Image();
      img.onload= function(){

        context.drawImage(img,0,0,300,300);
      };
img.src= event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  preview2(e: any): void {
    let canvas= this.mycanvas2.nativeElement;
    let context= canvas.getContext('2d');
    context.clearRect(0,0,300,300);

    var render= new FileReader();
    render.onload = function(event:any){
      var img = new Image();
      img.onload= function(){

        context.drawImage(img,0,0,300,300);
      };
img.src= event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  ngOnInit() {
  }

  public capture1() {

    this.dataUri1= this.mycanvas1.nativeElement.toDataURL("image/png");
    //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.dataUri1);
}

public capture2() {

  this.dataUri2= this.mycanvas2.nativeElement.toDataURL("image/png");
  //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  console.log(this.dataUri2);
}

public getData(){
  this.face.scanImage(this.dataUri1).subscribe(
    data1=>{this.dataFace1 = data1.json();
      this.faceId1= this.dataFace1[0].faceId;
      console.log('ID1:'+ this.faceId1);
         this.face.scanImage(this.dataUri2).subscribe(
            data2=>{this.dataFace2= data2.json();
            console.log(this.dataFace2);
            this.faceId2= this.dataFace2[0].faceId;
            console.log('ID2:'+this.faceId2);
              this.compare.compare(this.faceId1, this.faceId2).subscribe(
                data3=>{ this.dataVerify= data3.json();
                  this.isTrue= this.dataVerify.isIdentical;
                  this.percent= (this.dataVerify.confidence)*100;
                  console.log(this.dataVerify);
                  console.log(this.dataVerify.isIdentical);

                }
              )

          }
         )


})
}



}

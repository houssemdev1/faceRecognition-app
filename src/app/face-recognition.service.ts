import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class FaceRecognitionService {
  public url='https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?FaceId=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,occlusion,blur,exposure,noise';
  constructor(private http: Http) { }

  scanImage( base64Image: string) {
    const headers= new Headers
     ({
       'Content-Type':'application/octet-stream',
       'Ocp-Apim-Subscription-Key':'cdc97e2a38a4446787a18b76cd1d997c'
     });
    const options = new RequestOptions({headers});
    const blob = this.makeblob(base64Image);
    console.log(blob);

    return this.http.post(this.url,blob,options)
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







}



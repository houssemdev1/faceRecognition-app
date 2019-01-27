import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Face2Component } from './home/face2/face2.component';
import { CamComponent } from './home/cam/cam.component';
import { CompareComponent } from './home/compare/compare.component';
import { FacedatabaseComponent } from './home/facedatabase/facedatabase.component';
import { DatabaseComponent } from './database/database.component';
import { LoginwithfaceComponent } from './loginwithface/loginwithface.component';

const routes: Routes = [
   { path: '', component: LoginComponent },
   {path : 'login', component: LoginComponent},
   { path: 'loginwithface', component: LoginwithfaceComponent },
   { path: 'createAccount', component: DatabaseComponent},
   { path: 'home', component: HomeComponent, children: [
    { path: 'face', component: Face2Component},
    { path: 'cam', component: CamComponent},
    { path: 'compare', component: CompareComponent},
    { path: 'facedatabase', component: FacedatabaseComponent },
    { path: 'face2', component: Face2Component },
    {path:'', component: Face2Component}
  ]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

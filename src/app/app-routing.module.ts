import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { CardsUsuariosComponent } from './components/cards-usuarios/cards-usuarios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cardUsu' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cardUsu', component: CardsUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
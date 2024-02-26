import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DahsboardComponent } from './dahsboard/dahsboard.component'; // Correct the component name

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to register by default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dahsboard', component: DahsboardComponent }, // Correct the component name
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

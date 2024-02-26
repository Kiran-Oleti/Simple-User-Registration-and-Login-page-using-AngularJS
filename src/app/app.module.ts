import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { DahsboardComponent } from './dahsboard/dahsboard.component'; // Correct the component name

@NgModule({ 
  declarations: [ 
    AppComponent, 
    LoginComponent, RegisterComponent, DahsboardComponent // Correct the component name
  ], 
  imports: [ 
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatCardModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
  ], 
  providers: [], 
  bootstrap: [AppComponent] 
}) 
export class AppModule { }

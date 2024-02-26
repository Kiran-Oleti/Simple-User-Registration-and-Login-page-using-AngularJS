// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageLoaderService } from '../image-loader.service';
import { ApiService } from '../services/api.service';  // Import your ApiService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logoUrl: string = '';
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private imageLoader: ImageLoaderService,
    private apiService: ApiService, // Inject your ApiService
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadLogo();
  }

  loadLogo() {
    // Update the path based on your project structure
    const newLogoUrl = './assets/logo.png';

    // Load the logo
    this.imageLoader.loadImage(newLogoUrl).subscribe((blob: Blob) => {
      this.logoUrl = URL.createObjectURL(blob);
    });
  }

  onSubmit(): void {
    // Clear previous error message
    this.loginError = null;
  
    if (this.loginForm.valid) {
      // Disable the submit button to prevent multiple clicks
      this.loginForm.disable();
  
      // For example, if you want to use loginUser from ApiService:
      const loginDetails = this.loginForm.value;
      this.apiService.loginUser(loginDetails).subscribe(
        (response: any) => {
          // Log the response to the console
          console.log('Login response:', response);
  
          // Check if the response contains an 'error' property
          if (response.error) {
            // Handle unsuccessful login
            console.error('Login error:', response.error);
            this.loginError = 'Invalid login credentials';
  
          } else {
            // Handle successful login response
            this.router.navigate(['/dahsboard']);
  
            // Show an alert upon successful login
            alert('Login successful!');
          }
        },
        (error: any) => {
          // Log the error to the console
          console.error('Login error:', error);
  
          // Handle unexpected errors
          this.loginError = 'An unexpected error occurred during login';
        }
      ).add(() => {
        // Re-enable the submit button after the subscription is completed
        this.loginForm.enable();
      });
    } else {
      // Mark all fields as touched and dirty
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
    }
  }  
}  
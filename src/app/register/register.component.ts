import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  });

  constructor(private router: Router, private apiService: ApiService) {}

  register() {
    if (this.registerForm.valid) {
      // Get form values
      const email = this.registerForm.get('email')!.value;
      const username = this.registerForm.get('username')!.value;
      const firstname = this.registerForm.get('firstname')!.value;
      const lastname = this.registerForm.get('lastname')!.value;
      const password = this.registerForm.get('password')!.value;
      const passwordConfirm = this.registerForm.get('passwordConfirm')!.value;

      // Validate password confirmation
      if (password !== passwordConfirm) {
        // Handle password mismatch
        console.log('Password and password confirmation do not match');
        return;
      }

      // Construct user details object
      const userDetails = {
        email,
        username,
        firstname,
        lastname,
        password,
      };

      this.apiService.registerUser(userDetails).subscribe(
        (response: any) => {
          // Handle successful registration here
          console.log('User registered successfully:', response);

          // Check if the response is a valid JSON
          try {
            const jsonResponse = JSON.parse(response);
            // Do something with the JSON response if needed
          } catch (error) {
            // Handle non-JSON response
            console.warn('Non-JSON response:', response);
          }
          alert('User registration successful!');

          // Redirect to the login page after successful registration
          this.router.navigate(['/login']);
        },
        (error: any) => {
          // Handle registration error here
          console.error('Error during registration:', error);
        }
      );
    }
  }
}

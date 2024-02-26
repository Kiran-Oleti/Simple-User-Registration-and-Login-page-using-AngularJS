// dahsboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements OnInit {
  user: any;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserDetails().subscribe(
      (response: any) => {
        if (response.username && response.email) {
          this.user = response;
        } else {
          console.warn('User details not available.');
        }
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  logout(): void {
    this.apiService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}

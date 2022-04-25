import { Component, OnInit,Input} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};  
  constructor(
    public fetchApiData: FetchApiDataService,
    private router:Router,public snackBar: MatSnackBar,
    
    ) { }

  ngOnInit(): void {
  }
  logout():void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['']);
  }
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }
  openUserProfile():void {
    this.getUser();
    this.router.navigate(['user']);
  }
  openMovieList():void{
    this.router.navigate(['movies']);
  }
  
}

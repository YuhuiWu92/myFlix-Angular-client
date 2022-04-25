import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditFormComponent } from '../edit-form/edit-form.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
  openEditFormDialog(): void {
    this.dialog.open(EditFormComponent, {
      width: '500px',
      height:'300px'
    });
  }
  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      localStorage.clear();
      this.snackBar.open('You have been successfully logged out', 'OK', {
        duration: 4000,
      });
      
    });
    this.router.navigate(['welcome']);
    
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
/**
 * 
 */
export class EditFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};
 
  constructor( 
    public fetchApiData:FetchApiDataService,
    public dialogRef: MatDialogRef<EditFormComponent>,
    public snackBar: MatSnackBar

    ) { }
    @Input() userProfile = {
      Username: this.user.Username,
      Password: this.user.Password,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
    };
  ngOnInit(): void {
    this.getUser();
  }
  /**
   * 
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  saveUserInfo(): void {
    this.fetchApiData.editUserProfile(this.userProfile).subscribe((resp)=>{
      this.dialogRef.close();
      localStorage.setItem('Username', this.userProfile.Username);
      localStorage.setItem('Password', this.userProfile.Password);
    })
    this.snackBar.open('Your profile was updated successfully!', 'OK', {
      duration: 4000,
    });
  }

}

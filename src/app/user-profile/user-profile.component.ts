import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  favMovies: any[] = [];
  movies : any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router:Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserProfile();
    
    this.getFavoriteMovies();

  }
  getMovies():void {
    this.fetchApiData.getAllMovies().subscribe((response:any)=>{
      this.movies=response;
      console.log(this.movies);
      return this.movies;
    })
  }
  /**
   * call API endpoint to get user info
   * @function getUserProfile
   * @param Username
   * @return users data in json format
   */
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
  /**
   * get users FavoriteMovies from the users data
   */
   getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
        this.favMovies = res.FavoriteMovies;
        console.log(this.favMovies);
        return this.favMovies;
      });
    }
  }
/**
   * use API end-point to remove user favorite
   * @function deleteFavoriteMovies
   * @param Id {string}
   * @returns updated users data in json format
   */
 removeFavoriteMovies(movieID: string, title: string): void {
  this.fetchApiData.deleteFavoriteMovies(movieID).subscribe((resp: any) => {
    console.log(resp);
    this.snackBar.open(
      `${title} has been removed from your favorites!`,
      'OK',
      {
        duration: 2000,
      }
    );
    this.ngOnInit();
  });

}
  /**
   * call API endpoint to remove the current user
   * @function deleteUserProfile
   * @param Username {any}
   * @return that the account has been removed
   */
   deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
    
  }
  /**
   * open a dialog to edit the profile of the user
   * @module EditFormComponent
   */
  openEditFormDialog(): void {
    this.dialog.open(EditFormComponent, {
      width: '500px',
      height:'300px'
    });
  }
    /**
   *open a dialog to display the GenreViewComponent
   * @param name {string}
   * @param description {string}
   */
   openGenreDialog(name:string,description:string):void {
    this.dialog.open(GenreCardComponent,{
      data:{name:name,description:description
      },
      width: '500px'
    })
 }
  /**
   * open a dialog to display the DirectorViewComponent
   * @param name {string}
   * @param bio {string}
   * @param birthday {Date}
   */
  openDirectorDialog(name:string,birthday:Date,bio:string):void {
    this.dialog.open(DirectorCardComponent,{
      data:{
        name:name,
        birthday:birthday,
        bio:bio
      },
      width: '500px'
    })
  }

  openMovieDetailsDialog(title:string,description:string,genreType:string,
    directorName:string):void {
    this.dialog.open(MovieDetailsComponent,{
      data:{
        title:title,
        description:description,
        genreType:genreType,
        directorName:directorName    
      },
      width:'500px'
    })
  }




}
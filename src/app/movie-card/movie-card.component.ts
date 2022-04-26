import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { NavbarComponent } from '../navbar/navbar.component';
//import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favouriteMovies: any[] = [];
  user: any[] = [];
  constructor(
    public fetchApiData:FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();

  }
  getMovies():void {
    this.fetchApiData.getAllMovies().subscribe((response:any)=>{
      this.movies=response;
      console.log(this.movies);
      return this.movies;
    })
  }

  openGenreDialog(name:string,description:string):void {
    this.dialog.open(GenreCardComponent,{
      data:{
        name,
        description
      },
      width: '500px'
    })
 }
  openDirectorDialog(name:string,birthday:Date,bio:string):void {
    this.dialog.open(DirectorCardComponent,{
      data:{
        name,
        birthday,
        bio
      },
      width: '500px'
    })
  }

  openMovieDetailsDialog(title:string,description:string,genreType:string,
    directorName:string):void {
    this.dialog.open(MovieDetailsComponent,{
      data:{
        title,
        description,
        genreType,
        directorName    
      },
      width:'500px'
    })
  }
   /**
   * get the favorite movieslist of the user
   */
    getFavouriteMovies(): void {
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.favouriteMovies = resp.FavouriteMovies;
        console.log(this.favouriteMovies);
      });
    }
  /**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param id {string}
   * @returns an array of the movie object in json format
   */
   addFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavouriteMovie(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  /**
   * use API endpoint to remove user favorite
   * @function deleteFavoriteMovies
   * @param Id {string}
   * @returns favorite movies has been updated in json format
   */
   removeFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavouriteMovie(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

    /**
   * is movie already in favoritelist of user
   * @param id {string}
   * @returns true or false
   */
     isFavourited(MovieID: string): boolean{
      return this.favouriteMovies.includes(MovieID);
    }

  /**
   * add or remove favorite movie
   * if the movie is not on the favorite list, call
   * @function addFavoriteMovies
   * if the movie is already on the user favorite list, call
   * @function removeFavoriteMovies
   * @param movie {any}
   */
   toggleFavourite(movie: any): void {
    console.log(movie);
    this.isFavourited(movie._id)
      ? this.removeFavouriteMovie(movie._id, movie.Title)
      : this.addFavouriteMovie(movie._id, movie.Title);
  }
}

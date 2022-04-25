import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
//import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  Favorites: any[] = [];
  user: any[] = [];
  constructor(
    public fetchApiData:FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();

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
    getFavoriteMovies(): void {
      const user = localStorage.getItem('user');
      this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
        this.Favorites = resp.FavoriteMovies;
        console.log(this.Favorites);
      });
    }
  /**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param id {string}
   * @returns an array of the movie object in json format
   */
   addFavoriteMovies(movieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(movieID).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * use API endpoint to remove user favorite
   * @function deleteFavoriteMovies
   * @param Id {string}
   * @returns favorite movies has been updated in json format
   */
  removeFavoriteMovies(movieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      console.log(`${title} has been removed from your favorites!`)
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }
    /**
   * is movie already in favoritelist of user
   * @param id {string}
   * @returns true or false
   */
     isFavourited(MovieID: string): boolean{
    return this.Favorites.includes(MovieID);
  }

  /**
   * add or remove favorite movie
   * if the movie is not on the favorite list, call
   * @function addFavoriteMovies
   * if the movie is already on the user favorite list, call
   * @function removeFavoriteMovies
   * @param movie {any}
   */
   toggleFavorite(movie: any): void {
     console.log(movie)
    this.isFavourited(movie._id)
      ? this.removeFavoriteMovies(movie._id, movie.Title)
      : this.addFavoriteMovies(movie._id, movie.Title);
  }
}

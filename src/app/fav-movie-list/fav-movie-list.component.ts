import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fav-movie-list',
  templateUrl: './fav-movie-list.component.html',
  styleUrls: ['./fav-movie-list.component.scss']
})
export class FavMovieListComponent implements OnInit {
  user: any = {};
  genres: any[] = [];
  favouriteMovies: any[] = []; 
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.getUserProfile();
    this.getGenres();
    this.getFavouriteMovies();
  }
/**
   * Function to get user details by making an API call
   * @function getUserProfile
   * @return an object with the user data in json format
   */

 getUserProfile(): void {
  const UserID = localStorage.getItem('UserID');
  if (UserID) {
    this.fetchApiData.getUserProfile(this.user).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user;
    });
  }
}


/**
* Function to get a list of all movies from the API, then filter this list to get movies with MovieID that 
* matches the MovieIDs in user.FavouriteMovies
* @function getFavouriteMovies
* @returns an updated favouriteMovies array
*/
getFavouriteMovies(): void {
this.fetchApiData.getAllMovies().subscribe((res: any) => {
  this.favouriteMovies = res.filter((movie: any) => {
    return this.user.FavouriteMovies.includes(movie._id)
  });
  console.log(this.favouriteMovies);
  return this.favouriteMovies;
})
}

/**
* Function to remove a certain movie object from the user's FavouriteMovies list using an Api call.
* A popup will appear stating that the movie was removed from the user's favourites. Page gets reloaded to update the UI.
* @function deleteFavoriteMovies
* @param MovieID the id of the movie chosen by the user
* @param title the title of the movie chosen by the user
* @returns the function getFavouriteMovies() 
*/
removeFavouriteMovie(MovieID: string, title: string): void {
this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((resp: any) => {
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
* Open a dialog to display the director component, passing it the data it needs to display inside the data object.
* @param name name of the director of the selected movie.
* @param bio bio of the director.
* @param birthdate birthdate of the director.
*/
openDirector(name: string, bio: string, birthdate: Date): void {
this.dialog.open(DirectorCardComponent, {
  data: {
    Name: name,
    Bio: bio,
    Birthdate: birthdate,
  },
  width: '500px',
  backdropClass: 'backdropBackground'
});
}

/**
* Opens a dialog to display the synopsis component, passing it the data it needs to display inside the data object.
* @function openSynopsis
* @param title title of the selected movie.
* @param imagePath image path of the selected movie.
* @param description description of the selected movie.
*/
openSynopsis(title: string, imagePath: any, description: string): void {
this.dialog.open(MovieDetailsComponent, {
  data: {
    Title: title,
    ImagePath: imagePath,
    Description: description,
  },
  width: '500px',
  backdropClass: 'backdropBackground'
});
}

/**
* Invokes the getGenres method on the fetchApiData service and populates the movies array with the response. 
* @function getGenres
* @returns an array with all genre objects in json format
*/
getGenres(): void {
this.fetchApiData.getGenre().subscribe((resp: any) => {
    this.genres = resp;
    console.log(this.genres);
    return this.genres;
  });
}

/**
* Function to search through genres array and find a match to the MovieID.
* Opens a dialog to display the genre component, passing it the data it needs to display inside the data object.
* @function openGenre
* @param id id of the selected movie
*/
openGenre(id: string): void {
let name;
let description;
console.log(id);

for(let i=0; i<this.genres.length; i ++) {
  console.log(this.genres[i]._id)
    if (this.genres[i]._id == id) {
      name = this.genres[i].Name;
      description = this.genres[i].Description;
      break;
    }
}
this.dialog.open(GenreCardComponent, {
  data: {
    Name: name,
    Description: description,
  },
  width: '500px',
  backdropClass: 'backdropBackground'
});
}

}

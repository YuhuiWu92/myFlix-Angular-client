import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl ='https://my-film-flix.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');
export interface User {
  _id: string;
  favouriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient,private router: Router) {
    this.http=http;
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 // login user
 public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
);
} 
 // get all the app movies.
 getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}    

 // This will get a single movie.
 getOneMovie(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// This will get the movie director name.
getDirector(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'directors/:name', {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// This will get the movie genre.
getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'genres/:name', {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// This will get to the user profile.
getUserProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const UserID = localStorage.getItem('UserID');
  return this.http
    .get(apiUrl + `users/${UserID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

// This will send back the favorite movies component.

getFavouriteMovies(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(
    map(this.extractResponseData), catchError(this.handleError)
  );
}

// This will add a favorite movie to the user movie list.
addFavouriteMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const UserID = localStorage.getItem('UserID');
  return this.http
    .post(apiUrl + `users/${UserID}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

// This will edit a user favorite profile.
editUserProfile(userCredentials: object): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${user}`, userCredentials, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(
    map(this.extractResponseData), catchError(this.handleError)
  );
}

// This will delete a user profile.
public deleteUserProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http
    .delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError)
  );
}

// This will delete a user's favorite movie.

deleteFavouriteMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const UserID = localStorage.getItem('UserID');
  return this.http
    .delete(apiUrl + `users/${UserID}/movies/${MovieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}


  // Extract data response 
private extractResponseData(data: any | Object): any {
  return data || {};
}
// handleError
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

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
  Favorites: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}
@Injectable({
  providedIn: 'root'
})
 /**
* Inject the HttpClient module to the constructor params 
* This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
export class FetchApiDataService {

  constructor(private http: HttpClient,private router: Router) {
    this.http=http;
  }
  /** 
   * Making the api call for the user registration endpoint
   * @funtion userRegistration
   * @param userDetails this come from the user's registration.
   * @returns the user informations such as username, password in json format
   */
 public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 /**
  * @function userLogin
  * @param userDetails this fetch the usersinfo when the user login.
  * @returns get the user's input value in json format
  */
 public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
);
} /**
 * get all the app movies
 * @function getAllMovies
 * @returns all the movies arry in database
 */

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
/**
 * This will get a single movie.
 * @function getOneMovie
 * @returns this get a single movie information
 */
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
/**
 * This will get the director's Info.
 * @function getDirector
 * @returns Director-card
 */
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


/**
 * This will get the movie genre Info.
 * @function getGenre
 * @returns genre card
 */
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
/**
 * This function will get to the user profile.
 * @function getUserProfile
 * @param username the name of user in thier Profie
 * @returns the user's information in their profile and also Authorization.
 */

getUserProfile(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(
    map(this.extractResponseData), catchError(this.handleError)
  );
}


/**This will send back the favorite movies component.
 * @function getFavoriteMovies
 * @param username to get the FavoriteMovies of a user, need to check if the username in the localstorage.
 * @returns FavoriteMovies
 */
getFavoriteMovies(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(
    map(this.extractResponseData), catchError(this.handleError)
  );
}
/**
 * This will add a favorite movie to the user movie list.
 * @function addFavoriteMovies
 * @param MovieID the movie id, used by adding favorite movies from user
 * @returns FavoriteMovies of the user
 */

addFavoriteMovies(MovieID: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
    .post(apiUrl + `users/${username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}
/**
 * This will edit a user favorite profile.
 * @function editUserProfile
 * @param userCredentials the required user info in Profile
 * @returns the user' input in the profile page
 */

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
/**
 * This will delete a user profile.
 * @function deleteFavoriteMovies
 * @returns delete the info and token in the localstorage
 */

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
/**
 * @function deleteUserProfile
 * @param MovieID the movie id, used by deleting favorite movies from user
 * @returns the Info for the delete movies
 */
deleteFavoriteMovies(MovieID: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
    .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

  /**
   * Extract data response 
   * @function extractResponseData
   * @param data data response 
   * @returns data response
   */
private extractResponseData(data: any | Object): any {
  return data || {};
}

/**
 * handleError
 * @function handleError
 * @param error the error by http request.
 * @returns error message und error status
 */
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

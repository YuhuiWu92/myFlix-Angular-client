import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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


}

import { Component } from '@angular/core';
import {FetchApiDataService}from './fetch-api-data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  data=[];
  constructor(private movie:FetchApiDataService){
    this.movie.getAllMovies().subscribe(data=>{
      console.warn(data)
      this.data=data
    })
  }
  
}

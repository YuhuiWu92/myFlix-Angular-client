import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
//import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) 
    public data:{
      name:string;
      description:string;
    }){ }

  ngOnInit(): void {
  }

  /* getGenre(): void {
    this.fetchApiData.getGenre(this.movieInfo).subscribe((response)=>{
      console.log(response);
      localStorage.setItem('user',response.user.Username);
      localStorage.setItem('token',response.token);
    })
  } */
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavMovieListComponent } from './fav-movie-list.component';

describe('FavMovieListComponent', () => {
  let component: FavMovieListComponent;
  let fixture: ComponentFixture<FavMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavMovieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

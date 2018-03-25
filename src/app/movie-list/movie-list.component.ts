import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MovieListItem} from '../interfaces';
import {MovieService} from '../common/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private _movieService: MovieService) { }
  public moviesStream$: Observable<MovieListItem[]> = this._movieService.moviesStream$;
  ngOnInit(): void {
    this._movieService.getMovies();
  }
  deleteMovie(imdbID: string) {
    this._movieService.deleteMovie(imdbID);
  }

}

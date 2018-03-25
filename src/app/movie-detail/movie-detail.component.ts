import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MovieDetail} from '../interfaces';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(private _activatedRouter: ActivatedRoute, private router: Router) { }
  public movieDetail: MovieDetail;
  ngOnInit() {
    this._activatedRouter.data
    .subscribe((data: {movie: MovieDetail}) => {
      this.movieDetail = data.movie;
    });
  }
  backToList() {
    this.router.navigate(['/movies']);
  }

}

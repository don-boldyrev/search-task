import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import {MovieDetail} from '../../interfaces';

import { MovieService } from './movie.service';

@Injectable()
export class MovieResolveService implements Resolve<boolean | MovieDetail> {
  constructor(private _movieService: MovieService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<boolean | MovieDetail> {
    const id = route.paramMap.get('id');
    return this._movieService.getMovie(id).map(movie => {
      if (movie) {
        return movie;
      } else {
        this.router.navigate(['/movies']);
        return false;
      }
    });
  }
}

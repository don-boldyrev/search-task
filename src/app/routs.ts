import {Route} from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieResolveService} from './common/services/movie-resolve.service';

export const routes: Route [] = [
    {
      path: '',
      redirectTo: 'movies',
      pathMatch: 'full'
    },
    {
      path: 'movies',
      component: MoviesComponent,
      children: [
        {
          path: '',
          component: MovieListComponent
        },
        {
          path: ':id',
          component: MovieDetailComponent,
          resolve: {
            movie: MovieResolveService
          }
        },
        {
          path: '**',
          redirectTo: '../movies'
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'movies'
    }
  ];


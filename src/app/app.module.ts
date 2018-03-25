import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MovieService} from './common/services/movie.service';
import {MovieResolveService} from './common/services/movie-resolve.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatButtonModule, MatCardModule} from '@angular/material';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import {RouterModule} from '@angular/router';
import {routes} from './routs';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieListComponent,
    MovieDetailComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AsyncLocalStorageModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    MovieService,
    MovieResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {catchError, map, delay} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import {MovieListItem, MoveResultSearch, MovieDetail} from '../../interfaces';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class MovieService {

  constructor( private http: HttpClient, private storage: AsyncLocalStorage) { }
  private apiKey = 'a8b82186';
  private movieList: MovieListItem[] = [];
  private movieList$$: Subject<MovieListItem[]> = new Subject();
  public getMovies() {
    this.storage.getItem('movies').pipe(
      delay(1000)
    ).
    subscribe((json: string) => {
      if (!json) {
        this.movieList = [];
      } else {
        this.movieList = JSON.parse(json);
      }
      this.movieList$$.next(this.movieList);
    });
  }
  public get moviesStream$(): Observable<MovieListItem[]> {
    return this.movieList$$.asObservable();
  }
  public searchMovies(term: string, page: number = 1): Observable<MovieListItem[]> {
    if (!term.trim()) {
      return Observable.of([]);
    }
    return this.http.get<MoveResultSearch>(`http://www.omdbapi.com/?type=movie&apikey=${this.apiKey}&s=${term}&page=${page}`).pipe(
      map((result: MoveResultSearch) => {
        if (result.Response === 'False') {
          return [];
        }
        return result.Search;
      }),
      catchError(this.handleError<MovieListItem[]>([]))
    );
  }
  private updateStorage() {
    this.storage.setItem('movies', JSON.stringify(this.movieList)).subscribe(() => {
      this.movieList$$.next(this.movieList);
    });
  }
  public addMovie(movie: MovieListItem) {
    this.movieList.push(movie);
    this.updateStorage();
  }
  public deleteMovie(imdbID: string) {
    this.movieList = this.movieList.filter((movie: MovieListItem) => {
      return movie.imdbID !== imdbID;
    });
    this.updateStorage();
  }
  public getMovie(id): Observable<boolean | MovieDetail> {
    return this.http.get<MovieDetail | MoveResultSearch>(`http://www.omdbapi.com/?type=movie&apikey=${this.apiKey}&i=${id}`).pipe(
      map((result: any) => {
        if (result.Response === 'False') {
          return false;
        }
        return result;
      }),
      catchError(this.handleError<boolean>(false))
    );
  }
  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return Observable.of(result as T);
    };
  }
}

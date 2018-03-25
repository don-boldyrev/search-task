import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MovieService} from '../common/services/movie.service';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {MovieListItem} from '../interfaces';
import {Subscription } from 'rxjs/Subscription';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';

import {FormControl} from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatAutocomplete) autocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  public placeholder = 'Search movies';
  public stateCtrl: FormControl;
  private term = '';
  private pageNumber = 1;
  private movies$: Observable<MovieListItem[]>;
  private page$: Observable<MovieListItem[]>;
  private searchPage = new Subject<number>();
  private subsriberTerm: Subscription;
  private subsriberPage: Subscription;
  public searchOptions: MovieListItem[] = [];
  constructor(private _movieService: MovieService) {
    this.stateCtrl = new FormControl();
    this.movies$ = this.stateCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap((state: string) => {
        this.term = state;
        this.pageNumber = 1;
        return this._movieService.searchMovies(state);
      })
    );
    this.page$ = this.searchPage.pipe(
      switchMap((pageNumber: number) => {
        return this._movieService.searchMovies(this.term, pageNumber);
      }),
    );
  }
  private changePage() {
    this.pageNumber++;
    this.searchPage.next(this.pageNumber);
  }
  subPanelScroll() {
    setTimeout(() => {
      if (this.autocompleteRef && this.autocompleteRef.panel && this.autocompleteTrigger) {
        Observable.fromEvent(this.autocompleteRef.panel.nativeElement, 'scroll')
          .map((event: MouseEvent) => {
            const nativeElement: HTMLElement = this.autocompleteRef.panel.nativeElement;
            const scrollTop = nativeElement.scrollHeight - nativeElement.clientHeight;

            return nativeElement.scrollTop - scrollTop;
          })
          .takeUntil(this.autocompleteTrigger.panelClosingActions)
          .subscribe((diff: number) => {
            if (diff === 0) {
              this.changePage();
            }
          });
      }
    });
  }
  onSelectMovie(movie: MovieListItem) {
    this._movieService.addMovie(movie);
  }
  ngOnInit(): void  {
    this.subsriberTerm = this.movies$.subscribe((movie: MovieListItem[]) => {
      this.searchOptions = movie;
    });
    this.subsriberPage = this.page$.subscribe((movie: MovieListItem[]) => {
      this.searchOptions = this.searchOptions.concat(movie);
    });
  }
  ngOnDestroy(): void {
    this.subsriberTerm.unsubscribe();
    this.subsriberPage.unsubscribe();
  }
}

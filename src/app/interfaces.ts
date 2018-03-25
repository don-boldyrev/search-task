export interface MovieListItem {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}
export interface MoveResultSearch {
    Response: string;
    Search?: MovieListItem[];
    totalResults?: string;
    Error?: string;
}
export interface MovieRating {
    Source: string;
    Value: string;
}
export interface MovieDetail extends MovieListItem {
    Response: string;
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Production: string;
    Rated: string;
    Ratings: MovieRating[];
    Released: string;
    Runtime: string;
    Website: string;
    Writer: string;
    imdbRating: string;
    imdbVotes: string;
}

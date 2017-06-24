(function () {
    angular
        .module("MovieSite")
        .factory("apiMoviesService",apiMoviesService);

    function apiMoviesService($http) {
        var api ={
            searchMovies: searchMovies,
            getGenres: getGenres,
            getNowPlaying: getNowPlaying,
            getUpcomingMovies: getUpcomingMovies,
            findMovieById: findMovieById,
            findCastById: findCastById
        };
        return api;

        function getGenres() {
            var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=3c03155a09d082917f4e65b5c963a7fc";
            return $http.get(url);
        }

        function searchMovies(movieTitle) {
            var url = "http://api.themoviedb.org/3/search/movie?api_key=3c03155a09d082917f4e65b5c963a7fc&query="+movieTitle+"&page=1&language=en&include_adult=false";
            return $http.get(url);
        }

        function findMovieById(id,callback) {
            var url = "http://api.themoviedb.org/3/movie/"+imdbID+"?api_key=3c03155a09d082917f4e65b5c963a7fc&append_to_response=videos,credits,reviews"
            $http.get(url).success(callback);
        }
        function getNowPlaying() {
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=3c03155a09d082917f4e65b5c963a7fc";
            return $http.get(url);
        }
        function getUpcomingMovies() {
            var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=3c03155a09d082917f4e65b5c963a7fc";
            return $http.get(url);
        }
        function findCastById(id,callback) {
            var url = "https://api.themoviedb.org/3/person/"+id+"?api_key=3c03155a09d082917f4e65b5c963a7fc&append_to_response=movie_credits";
            $http.get(url).success(callback);
        }
    }
})();
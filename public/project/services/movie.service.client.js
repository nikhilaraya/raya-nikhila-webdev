/**
 * Created by user on 07-06-2017.
 */
(function(){
    angular
        .module("MoviesSite")
        .factory("movieService",movieService);

    function movieService($http){
        var api = {
            "searchMoviesByTitle":searchMoviesByTitle,
            "latestMovies":latestMovies,
            "popularMovies":popularMovies,
            "searchMovieByID":searchMovieByID
        };
        return api;

        function searchMoviesByTitle(title){
            var url="http://api.themoviedb.org/3/search/movie?api_key=3c03155a09d082917f4e65b5c963a7fc&query="+title+"&page=1&language=en&include_adult=false";
            return $http.get(url);
        }

        function latestMovies(){
            console.log("latest");
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=3c03155a09d082917f4e65b5c963a7fc&region=US&include_adult=false";
            return $http.get(url);
        }

        function popularMovies(){
            var url = "http://api.themoviedb.org/3/movie/popular?api_key=3c03155a09d082917f4e65b5c963a7fc&region=US&include_adult=false";
            return $http.get(url);
        }

        function searchMovieByID(imdbID) {
            return $http.get("http://api.themoviedb.org/3/movie/"+imdbID+"?api_key=3c03155a09d082917f4e65b5c963a7fc&append_to_response=videos,credits,reviews");

        }

    }
})();
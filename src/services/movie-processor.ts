import IMovie from "../interfaces/IMovie";
import IRadarrMovie from "../interfaces/IRadarrMovie";

const processMovieData = (
  storageMovies: IMovie[],
  radarrMovies: IRadarrMovie[]
): IMovie[] => {
  let newStorageMovies: IMovie[] = [];

  // Add movies to localStorage
  radarrMovies?.forEach((radarrMovie, i) => {
    const movie = storageMovies.filter(
      (storageMovie) => radarrMovie.tmdbId === storageMovie.tmdbId
    )[0];

    if (!movie) {
      newStorageMovies.push({
        tmdbId: radarrMovie.tmdbId,
        title: `${radarrMovie.title} (${radarrMovie.year})`,
        searchString: radarrMovie.sortTitle,
        isActive: true,
      });
    }
  });

  // torrentData.movies.forEach((ls, i) => {
  //   const movie = radarrMovieList.filter((m) => m.tmdbid === ls.tmdbid);
  // });

  return newStorageMovies;
};

export default processMovieData;

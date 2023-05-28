import { Box, TableContainer, styled } from "@mui/material";
import RadarrApi from "./services/radarr-api";
import { useContext, useLayoutEffect } from "react";
import processMovieData from "./services/movie-processor";
import ILocalStorage from "./interfaces/ILocalStorage";
import MovieTable from "./components/MovieTable";
import { ApplicationContext } from "./contexts/ApplicationContext";
import { saveLocalStorage } from "./services/helper";

const radarrApi: RadarrApi = new RadarrApi();
const Container = styled(Box)(() => ({
  margin: "24px",
}));

const App = () => {
  const { storage, setStorage } = useContext(ApplicationContext);

  useLayoutEffect(() => {
    const updateMovieList = async () => {
      const radarrMovies = (await radarrApi.movies()).filter(
        (x) => !x.hasFile && x.digitalRelease
      );
      console.log(radarrMovies);

      const tempStorage: ILocalStorage = JSON.parse(
        localStorage.getItem("torrentData") || JSON.stringify({
          download: 0,
          upload: 0,
          movies: [],
        })
      );
      console.log(tempStorage);

      const newMovieData = processMovieData(tempStorage?.movies, radarrMovies);
      tempStorage.movies = newMovieData;

      setStorage(tempStorage);
      saveLocalStorage("torrentData", tempStorage);
    };

    updateMovieList();
  }, [setStorage]);

  return (
    <Container>
      <h2>Missing Movies in Radarr</h2>
      {!storage?.movies ? (
        <span>Loading data ...</span>
      ) : (
        <TableContainer sx={{ border: "1px solid #d3d3d3" }}>
          <MovieTable></MovieTable>
        </TableContainer>
      )}
    </Container>
  );
};

export default App;

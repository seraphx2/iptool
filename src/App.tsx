import { Box, TableContainer, styled } from "@mui/material";
import RadarrApi from "./services/radarr-api";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import processMovieData from "./services/movie-processor";
import ILocalStorage from "./interfaces/ILocalStorage";
import MovieTable from "./components/MovieTable";
import { ApplicationContext } from "./contexts/ApplicationContext";

const radarrApi: RadarrApi = new RadarrApi();
const Container = styled(Box)(() => ({
  margin: "24px",
}));

const App = () => {
  const { storage, setStorage } = useContext(ApplicationContext);

  useEffect(() => {
    console.log("localStorage update triggered");
    localStorage.setItem("torrentData", JSON.stringify(storage));
  }, [storage]);

  useLayoutEffect(() => {
    const updateMovieList = async () => {
      const radarrMovies = (await radarrApi.movies()).filter(
        (x) => !x.hasFile && x.digitalRelease
      );
      console.log(radarrMovies);

      const currentStorage: ILocalStorage = JSON.parse(
        localStorage.getItem("torrentData") || "{}"
      );
      console.log(currentStorage);

      const newMovieData = processMovieData(
        currentStorage.movies,
        radarrMovies
      );
      currentStorage.movies = newMovieData;

      setStorage(currentStorage);
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MovieDetailRow from "./MovieDetailRow";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { useContext } from 'react';

const MovieTable = () => {
  const { storage } = useContext(ApplicationContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>TMDB ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Torrent</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {storage?.movies
          .filter((m) => m.isActive)
          .map((movie) => (
            <MovieDetailRow key={movie.tmdbId} movie={movie}></MovieDetailRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;

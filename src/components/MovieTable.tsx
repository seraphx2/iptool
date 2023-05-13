import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MovieDetailRow from "./MovieDetailRow";
import MovieTorrent from "../interfaces/IMovie";

interface MovieTableProps {
  movies: MovieTorrent[];
}

const MovieTable = (props: MovieTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>TMDB ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Torrents</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.movies
          .filter((m) => m.isActive)
          .map((movie) => (
            <MovieDetailRow key={movie.tmdbId} movie={movie}></MovieDetailRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;

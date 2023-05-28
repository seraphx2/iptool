import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MovieDetailRow from "./MovieDetailRow";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { useContext } from "react";

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
          .map((m, i) => (
            <MovieDetailRow
              key={`${i}-${m.tmdbId}`}
              movieIndex={i}
              movie={m}
            ></MovieDetailRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;

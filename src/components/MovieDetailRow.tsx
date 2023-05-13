import {
  Box,
  Button,
  Dialog,
  TableCell,
  TableRow,
} from "@mui/material";
import IMovie from "../interfaces/IMovie";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import ProwlarrApi from "../services/prowlarr-api";
import ITorrent from "../interfaces/ITorrent";

interface MovieDetailRowProps {
  movie: IMovie;
}

const prowlarrApi: ProwlarrApi = new ProwlarrApi();

const MovieDetailRow = (props: MovieDetailRowProps) => {
  const { movie } = props;
  const [query, setQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [torrents, setTorrents] = useState<ITorrent[]>();

  useEffect(() => {
    const getTorrents = async () => {
      //const torrents = await prowlarrApi.search(query);

      //setTorrents(torrents);
      //setIsDialogOpen(true);
    };
    getTorrents();
  }, [query]);

  return (
    <>
      <TableRow>
        <TableCell>{movie.tmdbId}</TableCell>
        <TableCell>{movie.title}</TableCell>
        <TableCell>
          {!movie.torrent && (
            <>
              <Button onClick={() => {}} size="small" variant="contained">
                <SearchIcon></SearchIcon> Search
              </Button>
            </>
          )}
          {movie.torrent && <>test</>}
        </TableCell>
      </TableRow>
      <Dialog open={isDialogOpen}>
        {torrents?.map((t) => (
          <Box key={t.guid}>{t.title}</Box>
        ))}
      </Dialog>
    </>
  );
};

export default MovieDetailRow;

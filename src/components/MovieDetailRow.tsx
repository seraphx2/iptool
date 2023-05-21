import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import IMovie from "../interfaces/IMovie";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import ProwlarrApi from "../services/prowlarr-api";
import ITorrent from "../interfaces/ITorrent";
import { isValidInput } from "../services/helper";

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
      if (!isValidInput(query)) return;
      const torrents = await prowlarrApi.search(query);

      setTorrents(torrents);
      setIsDialogOpen(true);
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
              <Button
                onClick={() => {
                  setQuery(movie.searchString);
                }}
                size="small"
                variant="contained"
              >
                <SearchIcon></SearchIcon> Search
              </Button>
            </>
          )}
          {movie.torrent && <>test</>}
        </TableCell>
      </TableRow>
      <Dialog open={isDialogOpen}>
        <DialogTitle>
          Torrent Results
          <IconButton aria-label="close" onClick={() => setIsDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {torrents?.map((t) => (
            <Box key={t.guid}>{t.title}</Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieDetailRow;

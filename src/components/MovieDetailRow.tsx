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
import { useState } from "react";
import ProwlarrApi from "../services/prowlarr-api";
import ITorrent from "../interfaces/ITorrent";
import CircularProgress from "@mui/material/CircularProgress";

interface MovieDetailRowProps {
  movie: IMovie;
}

const prowlarrApi: ProwlarrApi = new ProwlarrApi();

const MovieDetailRow = (props: MovieDetailRowProps) => {
  const { movie } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [torrents, setTorrents] = useState<ITorrent[]>();

  const getTorrents = async (query: string) => {
    //if (!isValidInput(query)) return;

    setIsDialogOpen(true);

    const torrents = await prowlarrApi.search(query);

    setTorrents(torrents);
  };

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
                  getTorrents(movie.searchString);
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
      <Dialog fullScreen open={isDialogOpen}>
        <DialogTitle
          sx={{
            display: "flex !important",
            justifyContent: "space-between !important",
          }}
        >
          Torrent Results
          <IconButton
            onClick={() => {
              setIsDialogOpen(false);
              setTorrents([]);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!torrents && (
            <Box sx={{ justifyContent: "center", width: "100%" }}>
              <CircularProgress></CircularProgress>
            </Box>
          )}
          {torrents?.length === 0 && <div>No Results</div>}
          {torrents &&
            torrents?.map((t, i) => <Box key={`${i}-t.guid`}>{t.title}</Box>)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieDetailRow;

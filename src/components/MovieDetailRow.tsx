import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import IMovie from "../interfaces/IMovie";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import ProwlarrApi from "../services/prowlarr-api";
import ITorrent from "../interfaces/ITorrent";
import CircularProgress from "@mui/material/CircularProgress";
import TorrentSearchResult from "./TorrentSearchResult";
import { formatSizeUnits } from "../services/helper";

interface MovieDetailRowProps {
  movieIndex: number;
  movie: IMovie;
}

const prowlarrApi: ProwlarrApi = new ProwlarrApi();

const MovieDetailRow = (props: MovieDetailRowProps) => {
  const { movie, movieIndex } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [torrents, setTorrents] = useState<ITorrent[]>();

  const getTorrents = async (query: string) => {
    setIsDialogOpen(true);
    const torrentResults = await prowlarrApi.search(query);
    setTorrents(torrentResults);
  };

  return (
    <TableRow>
      <TableCell>{movie.tmdbId}</TableCell>
      <TableCell>{movie.title}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            getTorrents(movie.searchString);
          }}
          size="small"
          sx={{ marginRight: 1, minHeight: 0, minWidth: 0, padding: 0.5 }}
        >
          <SearchIcon></SearchIcon>
        </Button>
        {movie.torrent && (
          <>
            <Link href={movie.torrent.guid} target="_blank">
              {movie.torrent.title}
            </Link>
            {` ${formatSizeUnits(movie.torrent.size)}`}
          </>
        )}
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
                setTorrents(undefined);
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
            {torrents && (
              <TableContainer>
                {torrents?.map((t, i) => (
                  <TorrentSearchResult
                    key={`${i}-${t.guid}`}
                    movieIndex={movieIndex}
                    torrent={t}
                  ></TorrentSearchResult>
                ))}
              </TableContainer>
            )}
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default MovieDetailRow;

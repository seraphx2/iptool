import { Button, Link, TableCell, TableRow } from "@mui/material";
import ITorrent from "../interfaces/ITorrent";
import { formatSizeUnits, saveLocalStorage } from "../services/helper";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";

interface TorrentSearchResultProps {
  movieIndex: number;
  torrent: ITorrent;
}

const TorrentSearchResult = (props: TorrentSearchResultProps) => {
  const { storage, setStorage } = useContext(ApplicationContext);
  const { movieIndex, torrent } = props;

  const assignTorrent = () => {
    let tempStorage = storage;
    if (tempStorage) {
      tempStorage.movies[movieIndex].torrent = torrent;
      setStorage(tempStorage);
      saveLocalStorage("torrentData", tempStorage);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Button
          onClick={assignTorrent}
          size="small"
          sx={{ minHeight: 0, minWidth: 0, padding: 0.5 }}
        >
          <SaveIcon></SaveIcon>
        </Button>
      </TableCell>
      <TableCell>
        <Link href={torrent.guid} target="_blank">
          {torrent.title}
        </Link>
      </TableCell>
      <TableCell>{formatSizeUnits(torrent.size)}</TableCell>
      <TableCell>{torrent.seeders} seeds</TableCell>
      <TableCell>{torrent.indexerFlags}</TableCell>
    </TableRow>
  );
};

export default TorrentSearchResult;

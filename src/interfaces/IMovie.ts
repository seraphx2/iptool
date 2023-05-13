import ITorrent from "./ITorrent";

export default interface IMovie {
  tmdbId: number;
  title: string;
  searchString: string;
  isActive: boolean;
  torrent?: ITorrent;
}

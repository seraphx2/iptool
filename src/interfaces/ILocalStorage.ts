import IMovie from "./IMovie";

export default interface ILocalStorage {
  download: number;
  upload: number;
  movies: IMovie[];
}

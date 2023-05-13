export default interface ITorrent {
  guid: string;
  title: string;
  size: number;
  seeders: number;
  indexerFlags: [];
}

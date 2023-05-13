import IRadarrMovie from "../interfaces/IRadarrMovie";

export default class RadarrApi {
  private readonly url: string = "http://192.168.50.104:7878/api/v3";
  private readonly headers: HeadersInit = {
    "X-Api-Key": "f114aadeaafe45d5b06861d50686db16",
  };

  movies = async (): Promise<IRadarrMovie[]> => {
    const response = await window.fetch(`${this.url}/movie`, {
      method: "GET",
      headers: this.headers,
    });

    return await response.json();
  };
}

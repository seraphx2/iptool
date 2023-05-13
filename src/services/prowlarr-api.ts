import ITorrent from "../interfaces/ITorrent";

export default class ProwlarrApi {
  private readonly url: string = "http://192.168.50.104:9696/api/v1";
  private readonly headers: HeadersInit = {
    "X-Api-Key": "bc002010303d4ebbaf57addc8448b53c",
  };

  search = async (query: string): Promise<ITorrent[]> => {
    const response = await window.fetch(
      `${this.url}/search?Query=${query}&IndexerIds=3&IndexerIds=10`,
      {
        method: "GET",
        headers: this.headers,
      }
    );

    return await response.json();
  };
}

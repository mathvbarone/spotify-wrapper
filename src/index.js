const search = (query, type) => {
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`);
};
const searchAlbuns = () => { };
const searchArtists = () => { };
const searchTracks = () => { };
const searchPlaylists = () => { };

export { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists };

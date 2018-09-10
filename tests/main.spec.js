import { expect } from 'chai';
import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/index'

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
    // search (genérica) -> + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exists the search method', () => {
      expect(search).to.exist;
    })
    it('should exists the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    })
    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist;
    })
    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist;
    })
    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    })
  });
});

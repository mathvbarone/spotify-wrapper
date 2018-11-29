/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
  search,
  searchAlbuns,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
    it('should exists the search method', () => {
      expect(search).to.exist;
    });
    it('should exists the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });
    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });
  describe('Generic Search', () => {
    let spotify;
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('it should call fetch function', () => {
      const artists = search();
      expect(stubedFetch).to.have.been.called.calledOnce;
    });

    it('it should receive the correct URL to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        const albums = search('Incubus', 'album');
        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );

        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        );
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        );
      });
    });
  });
});

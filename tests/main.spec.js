/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search,
  searchAlbuns,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

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
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('it should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.called.calledOnce;
    });

    it('it should receive the correct URL to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        );
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        );
      });
    });
  });
});

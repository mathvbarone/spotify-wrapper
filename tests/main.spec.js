import chai, { expect } from 'chai';
import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/index'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
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
  describe('Generic Search', () => {
    it('it should call fetch function', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search();

      expect(fetchedStub).to.have.been.called.calledOnce;

      fetchedStub.restore();
    });
    it('it should receive the correct URL to fetch', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search('Incubus', 'artist');
      const albuns = search('Incubus', 'album');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });
  });
});



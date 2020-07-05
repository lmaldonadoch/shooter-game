export default class Model {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._soundOn = true;
    // eslint-disable-next-line no-underscore-dangle
    this._musicOn = true;
    // eslint-disable-next-line no-underscore-dangle
    this._bgMusicPlaying = false;
  }

  set musicOn(value) {
    // eslint-disable-next-line no-underscore-dangle
    this._musicOn = value;
  }

  get musicOn() {
    // eslint-disable-next-line no-underscore-dangle
    return this._musicOn;
  }

  set soundOn(value) {
    // eslint-disable-next-line no-underscore-dangle
    this._soundOn = value;
  }

  get soundOn() {
    // eslint-disable-next-line no-underscore-dangle
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    // eslint-disable-next-line no-underscore-dangle
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    // eslint-disable-next-line no-underscore-dangle
    return this._bgMusicPlaying;
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioObj = new Audio();
  public isPlaying = false;

  constructor() {
    this.audioObj.autoplay = true;
    this.audioObj.loop = true;
    this.audioObj.volume = 0.5;
  }

  public setAudio(url) {
    this.audioObj.src = url;
    this.audioObj.load();
    this.isPlaying = true;
  }

  public play(): void {
    this.audioObj.play();
    this.isPlaying = true;
  }

  public pause(): void {
    this.audioObj.pause();
    this.isPlaying = false;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AudioService} from '../../services/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

  constructor(private audioService: AudioService) {
  }

  ngOnInit(): void {
  }

  public play(): void {
    this.audioService.play();
  }

  public pause(): void {
    this.audioService.pause();
  }

  public isPlaying(): boolean {
    return this.audioService.isPlaying;
  }

  ngOnDestroy(): void {
    this.audioService.pause();
  }


}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IWSPeer} from '../../interfaces/iwspeer';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  isMuted = false;

  @Input() peer: IWSPeer;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  get vp(): any {
    return this.videoPlayer.nativeElement;
  }

  ngOnInit(): void {
    this.peer.data.on('stream', (stream: MediaStream) => {
      this.vp.srcObject = stream;
    });
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;

    // If implementing volume slider, use vp.volume range [0, ..., 1]
    // this.vp.volume = Number(!this.vp.volume);
  }
}

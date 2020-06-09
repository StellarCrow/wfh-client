import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Peer from 'simple-peer';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  isMuted = false;

  @Input() peerData: Peer;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  get vp(): any {
    return this.videoPlayer.nativeElement;
  }

  ngOnInit(): void {
    this.peerData.on('stream', (stream: MediaStream) => {
      this.vp.srcObject = stream;
    });
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;

    // If implementing volume slider, use vp.volume range [0, ..., 1]
    // this.vp.volume = Number(!this.vp.volume);
  }
}

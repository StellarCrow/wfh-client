import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MediaService} from '../../services/media.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements AfterViewInit {
  @Input() id: number;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private mediaService: MediaService) {
  }

  ngAfterViewInit(): void {
    this.configureMediaEventHandlers();
  }

  private configureMediaEventHandlers(): void {
    this.getMediaStream();
    this.createPeer();
    this.backOffer();
    this.backAnswer();
    this.removePeer();
  }

  private getMediaStream(): void {
    // TODO: return observable with stream as data,
    // so that we don't have to operate with the videoPlayer in the service
    this.mediaService.getMediaStream(this.videoPlayer.nativeElement);

    // nativeVideoPlayer.srcObject = stream; // Redirect media stream to videoPlayer source
    // nativeVideoPlayer.play()
  }

  private createPeer(): void {
    this.mediaService.createPeer();
    // TODO: create and play peer's video, configure mute layout
  }

  private backOffer(): void {
    this.mediaService.backOffer();
  }

  private backAnswer(): void {
    this.mediaService.backAnswer();
  }

  private removePeer(): void {
    this.mediaService.removePeer();
    // TODO: add necessary layout and logic changes
    // once the peer is removed successfully
  }
}

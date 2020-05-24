import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements AfterViewInit {
  @Input() id: number;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private mediaService: MediaService) {}

  ngAfterViewInit(): void {
    this.mediaService.getMediaStream(this.videoPlayer.nativeElement);
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ISocket } from '../../interfaces/isocket';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() id: number;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.getMediaStream();
  }
  
  private getMediaStream(): void {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false, // TODO: reset back to true once muting is done
      })
      .then((stream) => {
        console.log('[VIDEO] new user...');

        this.socketService.emit('', {username: 'Testuser'});
        console.log(this.videoPlayer.nativeElement);

        // Redirect media stream to videoPlayer source
        this.videoPlayer.nativeElement.srcObject = stream;
      })
      .catch((err) => console.log(`Stream error: ${err}`));
  }
}

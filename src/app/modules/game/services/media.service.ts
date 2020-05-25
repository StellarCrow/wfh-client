import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";

import Peer from "simple-peer";
import { Observable, Subscriber } from 'rxjs';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Injectable({
  providedIn: "root",
})
export class MediaService {
  client: any = {}; // TODO: improve this shiet
  stream: MediaStream;

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService
  ) {}

  // TODO: return observable with stream as data, without needing the video player
  public getMediaStream(nativeVideoPlayer: any): void {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false, // TODO: reset back to true once muting is completed
      })
      .then((stream) => {
        console.log('[VIDEO] new user connected:', this.dataStore.getUserName());
        this.stream = stream;

        this.socketService.emit('new-user-connected', {
          username: this.dataStore.getUserName(),
        });

        // return new Observable((subscriber: Subscriber<any>) => {
        //   subscriber.next(stream);
        // });

        nativeVideoPlayer.srcObject = stream; // Redirect media stream to videoPlayer source
        nativeVideoPlayer.play();
      })
      .catch((err) => console.log(`Stream error: ${err}`));
  }

  public createPeer(): void {
    this.socketService.on('create-peer', (id: number) => {
      console.log("createPeer");
  
      this.client.gotAnswer = false;
      const peer = this.initiatePeer(id, true);
  
      peer.on("signal", (data: unknown) => {
        if (!this.client.gotAnswer) {
          this.socketService.emit("media-offer", data);
        }
      });
  
      this.client.peer = peer;
    });
  }

  public backOffer(): void {
    this.socketService.on('media-back-offer', (id: number, offer: any) => {
      console.log("media-back-offer | offer below");
      console.log(offer);

      const peer = this.initiatePeer(id, false);
      peer.on("signal", (data: unknown) => {
        this.socketService.emit("media-answer", data);
      });
      peer.signal(offer);

      this.client.peer = peer;
    });
  }

  public backAnswer(): void {
    this.socketService.on('media-back-answer', (answer) => {
      console.log('media-back-answer | answer below');
      console.log(answer);

      this.client.gotAnswer = true;
      this.client.peer.signal(answer);
    });
  }

  // TODO: make changes from component side when component calls this fn
  public removePeer(): void {
    this.socketService.on('remove-peer', (id: number) => {
      console.log('removePeer | id:', id);
      
      if (this.client.peer) {
        this.client.peer.destroy();
      }
    });
  }

  private initiatePeer(id: number, isInit: boolean): any {
    console.log("initiatePeer | isInit:", isInit, "| id:", id);

    const peer = new Peer({
      initiator: isInit,
      stream: this.stream,
      trickle: false,
    });
    peer.on("stream", (stream) => {
      console.log('Playing stream | stream below');
      console.log(stream);

      // TODO: return observable with stream as data,
      // so that we don't have to operate with the videoPlayer here

      // // CREATE OTHER PEER's VIDEO

      // const videoEl = document.createElement('video');
      // videoEl.id = `peerVideo${id}`;
      // videoEl.srcObject = stream;
      // document.querySelector(`#peer${id}`).appendChild(videoEl);

      // videoEl.play();
      
      // const muteToggle = document.createElement('div');
      // muteToggle.id = `muteText${id}`;
      // muteToggle.innerHTML = 'Click to Mute/Unmute';
      // document.getElementById(`peer${id}`).appendChild(muteToggle);

      // videoEl.addEventListener('click', () => {
        // videoEl.volume = Number(!videoEl.volume); // toggle volume 0 <=> 1
        // console.log(`Change volume to ${videoEl.volume}`);
      // });
    });
    return peer;
  }
}

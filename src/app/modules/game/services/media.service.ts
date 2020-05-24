import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";

import Peer from "simple-peer";

@Injectable({
  providedIn: "root",
})
export class MediaService {
  client: any = {}; // TODO: improve this shiet

  constructor(private socketService: SocketService) {}

  public getMediaStream(nativeVideoPlayer: any): void {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false, // TODO: reset back to true once muting is completed
      })
      .then((stream) => {
        console.log('[VIDEO] new user connected');

        this.socketService.emit('', {username: 'Testuser'});
        console.log(nativeVideoPlayer);

        // Redirect media stream to videoPlayer source
        nativeVideoPlayer.srcObject = stream;
        nativeVideoPlayer.play();

        // Socket events
        this.backOffer()
        this.backAnswer();
        this.createPeer();
        this.removePeer();
      })
      .catch((err) => console.log(`Stream error: ${err}`));
  }

  // TODO: return Peer
  private initiatePeer(stream: MediaStream, id: number, isInit: boolean): any {
    console.log("initiatePeer | isInit:", isInit, "| id:", id);

    const peer = new Peer({
      initiator: isInit,
      stream,
      trickle: false,
    });
    peer.on("stream", (stream) => {
      console.log('WHOA! Playing stream | stream below');
      console.log(stream);

      // // CREATE OTHER PEER's VIDEO
      
      // const muteToggle = document.createElement('div');
      // muteToggle.id = `muteText${id}`;
      // muteToggle.innerHTML = 'Click to Mute/Unmute';
      // document.getElementById(`peer${id}`).appendChild(muteToggle);

      // let videoEl = document.createElement('video');
      // videoEl.id = `peerVideo${id}`;
      // videoEl.srcObject = stream;
      // document.querySelector(`#peer${id}`).appendChild(videoEl);

      // videoEl.play();

      // videoEl.addEventListener('click', () => {
        // videoEl.volume = Number(!videoEl.volume); // toggle volume 0 <=> 1
        // console.log(`Change volume to ${videoEl.volume}`);
      // });
    });
    return peer;
  }

  // Socket events

  backOffer(): void {
    this.socketService.on("back-offer", (
      stream: MediaStream,
      id: number,
      offer: any
    ) => {
      console.log("back-offer | offer below");
      console.log(offer);

      const peer = this.initiatePeer(stream, id, false);
      peer.on("signal", (data) => {
        this.socketService.emit("media-answer", data);
      });
      peer.signal(offer);

      this.client.peer = peer;
    });
  }

  backAnswer(): void {
    this.socketService.on('back-answer', (answer) => {
      console.log('back-answer | answer below');
      console.log(answer);

      this.client.gotAnswer = true;
      this.client.peer.signal(answer);
    });
  }

  createPeer(): void {
    this.socketService.on('create-peer', (stream: MediaStream, id: number) => {
      console.log("createPeer");
  
      this.client.gotAnswer = false;
      const peer = this.initiatePeer(stream, id, true);
  
      peer.on("signal", (data) => {
        if (!this.client.gotAnswer) {
          this.socketService.emit("Offer", data);
        }
      });
  
      this.client.peer = peer;
    });
  }

  // TODO: make changes from component side when component calls this fn
  removePeer(): void {
    this.socketService.on('remove-peer', (stream: MediaStream, id: number) => {
      console.log('removePeer | id:', id);
      
      if (this.client.peer) {
        this.client.peer.destroy();
      }
    });
  }
}

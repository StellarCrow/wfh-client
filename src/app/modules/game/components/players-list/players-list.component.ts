import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Peer from 'simple-peer';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {PeerService} from '../../services/peer.service';
import {SocketService} from '../../services/socket.service';
import {IPeerPlayer} from '../../interfaces/ipeer-player';
import {IPlayer} from 'src/app/shared/interfaces/iplayer';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit, AfterViewInit {
  public users: IPeerPlayer[];
  public currentUser: IPlayer;
  public finishedUsers: string[];
  public roomCode: string;
  public socketId: string;
  public hasVideo: boolean = true;

  @ViewChild('userVideo') userVideo: ElementRef;

  get uv(): any {
    return this.userVideo.nativeElement;
  }

  constructor(
    private dataStore: DataStoreService,
    private socketService: SocketService,
    public peerService: PeerService
  ) {
  }

  ngOnInit(): void {
    this.roomCode = this.dataStore.getRoomCode();
    this.socketId = this.socketService.socket.id;
    this.users = this.dataStore
      .getPlayersWithoutMe(this.socketId)
      .map(user => ({...user, peerData: null}));
    this.finishedUsers = this.dataStore.getFinishedUsers();
    this.currentUser = this.dataStore.getCurrentPlayer(this.socketId);
  }

  ngAfterViewInit(): void {
    this.arrangePeerConnection();
  }

  arrangePeerConnection(): void {
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then((stream) => {
        this.uv.srcObject = stream;
        this.uv.muted = true;

        this.socketService.on('all-peers', ({payload}) => {
          // console.log((`Received all peers to meet, creating myself ${this.socketId}`));

          payload.peerIDs.forEach(peerID => {
            const peer = this.createPeer(peerID, this.socketId, stream);
            this.peerService.peers.push({id: peerID, data: peer});

            const index = this.users.findIndex(user => user.socketId === peerID);
            this.users[index].peerData = peer;
          });
        });

        this.socketService.on('peer-joined', ({payload}) => {
          // console.log((`Heard of a peer ${payload.callerID} joining, creating them`));

          const peer = this.addPeer(payload.signal, payload.callerID, stream);
          this.peerService.peers.push({id: payload.callerID, data: peer});

          const index = this.users.findIndex(user => user.socketId === payload.callerID);
          this.users[index].peerData = peer;
        });

        this.socketService.on('received-return-signal', ({payload}) => {
          // console.log((`Heard that ${payload.id} received my signal and sent it back`));

          // find correct peer to signal to
          const peer = this.peerService.findPeer(payload.id);
          peer.data.signal(payload.signal);
        });

        this.socketService.on('peer-disconnected', ({payload}) => {
          // console.log(`Heard that peer ${payload.id} disconnected`);

          this.peerService.removePeer(payload.id);
          this.peerService.destroyPeer(payload.id);

          this.users = this.users.filter(user => user.socketId !== payload.id);
        });

        this.socketService.emit('join-room', {roomCode: this.roomCode});
      })
      .catch((err) => {
        console.log(err, 'No user media present, check your webcam.');
        this.hasVideo = false;
      });
  }

  /**
   * You as a new peer connect to room
   * and send signals to already established peers
   * @param userToSignal - who to signal about your creation
   * @param callerID - your peer ID
   * @param stream - your stream of peer data
   */
  createPeer(userToSignal, callerID, stream) {
    // console.log(`Establishing myself ${callerID} and sending signals to ${userToSignal}`);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      this.socketService.emit('send-signal', {userToSignal, callerID, signal});
    });

    return peer;
  }

  /**
   * you as an already established peer
   * receive a signal from a newly connected peer
   * @param incomingSignal - new peer's signal
   * @param callerID - new peer's socket ID
   * @param stream - new peer's stream of peer data
   */
  addPeer(incomingSignal, callerID, stream) {
    // console.log(`Adding another peer ${callerID} and returning them their signal`);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    // wait to signal back to new peer to meet them
    peer.on('signal', (signal) => {
      this.socketService.emit('return-signal', {signal, callerID});
    });

    // accept the signal from a new peer
    peer.signal(incomingSignal);

    return peer;
  }
}

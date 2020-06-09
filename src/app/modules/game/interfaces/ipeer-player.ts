import Peer from 'simple-peer';

export interface IPeerPlayer {
  username: string;
  avatar: string;
  socketId: string;
  peerData: Peer;
}

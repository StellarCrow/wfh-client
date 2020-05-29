import {Injectable} from '@angular/core';
import {IWSPeer} from '../interfaces/iwspeer';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  public peers: IWSPeer[] = [];

  public removePeer(peerID: string): void {
    this.peers = this.peers.filter(p => p.id !== peerID);
  }

  public destroyPeer(peerID: string): void {
    const peerToDestroy = this.findPeer(peerID);
    if (peerToDestroy) {
      console.log(`~ Destroying peer ${peerID} ~`);
      peerToDestroy.data.destroy();
    }
  }

  public findPeer(peerID: string): IWSPeer {
    return this.peers.find(p => p.id === peerID);
  }
}

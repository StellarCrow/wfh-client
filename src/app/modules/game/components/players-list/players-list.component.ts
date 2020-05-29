import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HideContentService} from '../../services/hide-content.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {IPlayer} from '../../../../shared/interfaces/iplayer';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit {
  public users: IPlayer[];
  public finishedUsers: string[];
  @Output() hideComponent = new EventEmitter<string>();

  public toggleSidenav(id): void {
    this.sidenavService.toggle(id);
    this.hideComponent.emit('left');
  }


  constructor(
    private sidenavService: HideContentService,
    private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.users = this.dataStore.getRoomsUsers();
    this.finishedUsers = this.dataStore.getFinishedUsers();
  }
}

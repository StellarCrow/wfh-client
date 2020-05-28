import {
  Component, OnInit, Output, EventEmitter,
} from '@angular/core';
import { HideContentService } from '../../services/hide-content.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit {
  @Output() hideComponent = new EventEmitter<string>();

  public toggleSidenav(id): void {
    this.sidenavService.toggle(id);
    this.hideComponent.emit('left');
  }


  constructor(private sidenavService:HideContentService) { }

  ngOnInit(): void {
  }
}

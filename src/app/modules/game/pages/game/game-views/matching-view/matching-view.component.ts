import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {Stages} from '../../../../constants/stages.enum';

@Component({
  selector: 'app-matching-view',
  templateUrl: './matching-view.component.html',
  styleUrls: ['./matching-view.component.scss']
})
export class MatchingViewComponent implements OnInit {

  constructor(private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.matching);
  }

}

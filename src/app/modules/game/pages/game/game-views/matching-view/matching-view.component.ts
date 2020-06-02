import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {Stages} from '../../../../constants/stages.enum';

@Component({
  selector: 'app-matching-view',
  templateUrl: './matching-view.component.html',
  styleUrls: ['./matching-view.component.scss']
})
export class MatchingViewComponent implements OnInit {
  tees = [
    {teeBgColor: 'tee-gray', teePicture: 'tee-img.jpg'}, 
    {teeBgColor: 'tee-red', teePicture: 'tee-img2.jpg'}, 
    {teeBgColor: 'tee-blue', teePicture: 'tee-img3.jpg'}
  ];
  phrases: string[] = ['Text1', 'Text2', 'Text3'];
  currentTee: number = 0;
  currentPhrase: number = 0;
  results = [];

  constructor(private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.matching);
  }

  previousTee(): void {
    if (this.currentTee === 0) {
      return;
    } else {
      this.currentTee -= 1;
    }
  }

  nextTee(): void {
    if (this.currentTee < this.tees.length - 1) {
      this.currentTee += 1;
    } else {
      return;
    }
  }

  previousPhrase(): void {
    if (this.currentPhrase === 0) {
      return;
    } else {
      this.currentPhrase -= 1;
    }
  }

  nextPhrase(): void {
    if (this.currentPhrase < this.phrases.length - 1) {
      this.currentPhrase += 1;
    } else {
      return;
    }
  }

  submit(): void {
    if (this.results.length === 3) {
      return;
    }

    const data = {
      teeBgColor: this.tees[this.currentTee].teeBgColor,
      teePicture: this.tees[this.currentTee].teePicture,
      phrase: this.phrases[this.currentPhrase]
    };

    this.results.push(data);
    this.tees.splice(this.currentTee, 1);
    this.phrases.splice(this.currentPhrase, 1);
    this.currentPhrase = 0;
    this.currentTee = 0;
    console.log(this.results);
  }

}

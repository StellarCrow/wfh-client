import {Component, OnInit} from '@angular/core';
import {ABOUTBACKGROUND, ABOUTBACKGROUND_HD} from '../../constants/backgrounds';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public defaultBackground = ABOUTBACKGROUND;

  public highResBackground = ABOUTBACKGROUND_HD;

  constructor() {
  }

  ngOnInit(): void {
  }

}

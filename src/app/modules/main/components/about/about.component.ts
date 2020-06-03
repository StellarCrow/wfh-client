import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public defaultImage = '/assets/backgrounds/about-background.png';

  public highResImage = 'https://wfh-storage.s3.eu-north-1.amazonaws.com/backgrounds/about-backgroundHighRes.png';

  constructor() {
  }

  ngOnInit(): void {
  }

}

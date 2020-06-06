import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tee',
  templateUrl: './tee.component.html',
  styleUrls: ['./tee.component.scss']
})
export class TeeComponent implements OnInit {
  @Input() fillColor: string;
  @Input() pictureUrl: string;
  @Input() phrase: string;

  ngOnInit(): void {
  }
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tee-image',
  templateUrl: './tee-image.component.svg',
  styleUrls: ['./tee-image.component.scss']
})
export class TeeImageComponent {
  @Input() fillColor: string;
  @Input() strokeColor: string = '#231f29';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tee-image',
  templateUrl: './tee-image.component.svg',
  styleUrls: ['./tee-image.component.scss']
})
export class TeeImageComponent{
  @Input() fillColor: string;

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }

}

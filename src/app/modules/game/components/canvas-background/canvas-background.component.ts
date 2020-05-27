import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-canvas-background',
  templateUrl: './canvas-background.component.html',
  styleUrls: ['./canvas-background.component.scss']
})
export class CanvasBackgroundComponent implements OnInit {

  constructor() {
  }

  colors: string[] = ['#231746', '#223618', '#5f0000'];

  @Output() setCanvasBg = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSetCanvasBg(color: string): void {
    this.setCanvasBg.emit(color);
  }

}

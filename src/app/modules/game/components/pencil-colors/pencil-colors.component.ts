import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pencil-colors',
  templateUrl: './pencil-colors.component.html',
  styleUrls: ['./pencil-colors.component.scss']
})
export class PencilColorsComponent implements OnInit {

  constructor() {
  }

  colors: string[] = ['#000', '#fff', '#975100', '#bd00ff', '#00c2ff', '#33ff00', '#ff0000'];

  @Output() setPencilColor = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSetPencilColor(color: string): void {
    this.setPencilColor.emit(color);
  }

}

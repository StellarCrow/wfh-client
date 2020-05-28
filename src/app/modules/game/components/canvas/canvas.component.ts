import { Component, Input, ElementRef, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  constructor() {
  }
  linesArray: { lineNumber: number, x: number, y: number, color: string }[] = [];
  isMouseDown = false;
  lineCount = 0;

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 350;

  @Output() submitDraw: EventEmitter<void> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#231746';
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  onSetPencilColor(color: string): void {
    this.ctx.strokeStyle = color;
  }

  onSetCanvasBg(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.redraw();
  }

  store(lineNumber: number, x: number, y: number, color: string) {
    const line = {
      lineNumber: lineNumber,
      x: x,
      y: y,
      color: color
    };
    this.linesArray.push(line);
  }

  redraw(): void {
    const lines = this.linesArray;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].lineNumber !== 0 && lines[i - 1].lineNumber !== 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(lines[i - 1].x, lines[i - 1].y);
        this.ctx.strokeStyle = lines[i].color;
        this.ctx.lineTo(lines[i].x, lines[i].y);
        this.ctx.stroke();
      }
    }
  }

  mouseDown(e: MouseEvent): void {
    this.isMouseDown = true;
    const currentPosition = this.getMousePos(e);
    this.ctx.moveTo(currentPosition.x, currentPosition.y);
    this.ctx.beginPath();
    this.lineCount += 1;
  }

  mouseMove(e: MouseEvent): void {
    if (this.isMouseDown) {
      const currentPosition = this.getMousePos(e);
      this.ctx.lineTo(currentPosition.x, currentPosition.y);
      this.ctx.stroke();
      this.store(this.lineCount, currentPosition.x, currentPosition.y, this.ctx.strokeStyle.toString());
    }
  }

  mouseUp(): void {
    this.isMouseDown = false;
    this.store(0, 0, 0, '#fff');
  }

  mouseLeave(): void {
    this.isMouseDown = false;
    this.store(0, 0, 0, '#fff');
  }

  getMousePos(e: MouseEvent): { x: number, y: number } {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  undo(): void {
    let maxId = 0;

    this.linesArray.forEach(item => {
      if (item.lineNumber > maxId) {
        maxId = item.lineNumber;
      }
    });

    const newLinesArray = this.linesArray.filter(item => {
      return item.lineNumber !== maxId;
    });

    newLinesArray.pop();
    this.linesArray = newLinesArray;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.redraw();
  }

  handleSubmit(): void {
    this.submitDraw.emit();
  }

}

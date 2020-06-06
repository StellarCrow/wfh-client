import {SocketService} from '../../services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ICanvasLines} from '../../interfaces/icanvas-lines';
import {GameViewService} from '../../services/game-view.service';
import {Stages} from '../../constants/stages.enum';
import {Subject} from 'rxjs';
import {ActionService} from '../../../../core/services/action.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit, OnDestroy {
  private notifier = new Subject();


  constructor(private socketService: SocketService,
              private dataStore: DataStoreService,
              private gameViewService: GameViewService,
              private actionService: ActionService) {
  }

  linesArray: ICanvasLines[] = [];
  isMouseDown: boolean = false;
  isTouched: boolean = false;
  lineCount: number = 0;
  width: number;
  height: number;
  canvasBackground: string = '#231746';


  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('canvasWrapper') public canvasWrapper: ElementRef;

  @Output() submitDraw: EventEmitter<void> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;


  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const canvasWrap: HTMLElement = this.canvasWrapper.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    canvasEl.width = this.width = canvasWrap.clientWidth;
    canvasEl.height = this.height = canvasWrap.clientWidth;

    this.ctx.lineWidth = 6;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#231746';
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.painting);
  }

  onSetPencilColor(color: string): void {
    this.ctx.strokeStyle = color;
  }

  onSetCanvasBg(color: string): void {
    this.canvasBackground = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.redraw();
  }

  store(lineNumber: number, x: number, y: number, color: string) {
    const line: ICanvasLines = {
      lineNumber,
      x,
      y,
      color
    };
    this.linesArray.push(line);
  }

  redraw(): void {
    const lines: ICanvasLines[] = this.linesArray;
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
      this.startPaint(currentPosition);
    }
  }

  mouseUp(): void {
    this.stopPaint();
  }

  mouseLeave(): void {
    this.stopPaint();
  }

  getMousePos(e: MouseEvent): { x: number, y: number } {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  touchMove(e: TouchEvent): void {
    const currentPosition = this.getTouchPos(e);
    this.touchLeave(currentPosition);

    if (this.isTouched) {
      this.startPaint(currentPosition);
    }
  }

  touchLeave(currentPosition: { x: number, y: number }): void {
    if (currentPosition.x < 0 || currentPosition.y < 0 || 
        currentPosition.x > this.width || currentPosition.y > this.height) {
      this.stopPaint();
    }
  }

  getTouchPos(e: TouchEvent): { x: number, y: number } {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }

  touchStart(e: TouchEvent) {
    this.isTouched = true;
    const currentPosition = this.getTouchPos(e);
    this.ctx.moveTo(currentPosition.x, currentPosition.y)
    this.ctx.beginPath();
    this.lineCount += 1;
  }

  touchEnd(): void {
    this.stopPaint();
  }

  startPaint(currentPosition: { x: number, y: number }): void {
    this.ctx.lineTo(currentPosition.x, currentPosition.y)
    this.ctx.stroke();
    this.store(this.lineCount, currentPosition.x, currentPosition.y, this.ctx.strokeStyle.toString());
  }

  stopPaint(): void {
    this.isTouched = false;
    this.isMouseDown = false;
    this.store(0, 0, 0, '#fff');
  }

  undo(): void {
    let maxId = 0;

    this.linesArray.forEach(item => {
      if (item.lineNumber > maxId) {
        maxId = item.lineNumber;
      }
    });

    const newLinesArray: ICanvasLines[] = this.linesArray.filter(item => {
      return item.lineNumber !== maxId;
    });

    newLinesArray.pop();
    this.linesArray = newLinesArray;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.redraw();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.linesArray = [];
    this.lineCount = 0;
    this.ctx.fillStyle = this.canvasBackground;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }


  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  handleSubmit(): void {
    // TODO: uncomment in production mode
    const payload = {
      userID: JSON.parse(localStorage.getItem('user'))._id,
      canvas: this.canvas.nativeElement.toDataURL(),
      room: this.dataStore.roomCode,
      pictureNumber: this.actionService.usersActions,
      canvasBackground: this.canvasBackground
    };
    this.socketService.emit('save-image', payload);
    this.actionService.registerAction();
    this.clearCanvas();
  }
}

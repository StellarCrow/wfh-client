import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-underlink',
  templateUrl: './underlink.component.html',
  styleUrls: ['./underlink.component.scss']
})
export class UnderlinkComponent {
  @Input() link: string = '';
  @Input() content: string = '';
  @Input() title: string = '';
}

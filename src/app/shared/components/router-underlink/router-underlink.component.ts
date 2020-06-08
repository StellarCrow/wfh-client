import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-router-underlink',
  templateUrl: './router-underlink.component.html',
  styleUrls: ['./router-underlink.component.scss']
})
export class RouterUnderlinkComponent {
  @Input() link: string = '';
  @Input() content: string = '';
}

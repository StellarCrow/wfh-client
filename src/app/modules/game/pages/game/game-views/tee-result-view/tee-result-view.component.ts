import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tee-result-view',
  templateUrl: './tee-result-view.component.html',
  styleUrls: ['./tee-result-view.component.scss']
})
export class TeeResultViewComponent implements OnInit {

  public teeFinal = {
    "picture" : { 
      "url":"https://wfh-test.s3.eu-north-1.amazonaws.com/pictures/6262/wm8sSQ7-CqWnzYKEAAAA.2.png",
      "created_by":"wm8sSQ7-CqWnzYKEAAAA",
      "background":"#5f0000"
    },
    "phrase" : {
      "phrase":"testovaya futbolka",
      "created_by":"8odsRkoX1XByZ5XqAAAB"
    },
    "created_by":"8odsRkoX1XByZ5XqAAAB"
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public leaveGame() {
    this.router.navigate(['/main/welcome']);
  }
}

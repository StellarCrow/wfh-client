import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SocketService } from "../../services/socket.service";
import { ISlogans } from "../../interfaces/islogans";
import { DataStoreService } from "../../../../core/services/data-store.service";

@Component({
  selector: "app-slogan",
  templateUrl: "./slogan.component.html",
  styleUrls: ["./slogan.component.scss"]
})
export class SloganComponent implements OnInit {
  public username: string;
  public roomCode: string;
  public sloganForm: FormGroup;
  public slogans: ISlogans[] = [];

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();
    this.listenNewSlogan();

    this.sloganForm = this.formBuilder.group({
      sloganText: [
        "",
        [Validators.required, Validators.minLength(1)]
      ]
    });
  }

  public listenNewSlogan(): void {
    this.socketService.listen("slogan").subscribe(({ payload }) => {
      this.slogans = [
        ...this.slogans,
        { username: payload.username, slogan: payload.slogan }
      ];
    });
  }

  public submitSlogan(): void {
    const newSlogan = this.sloganForm.value.sloganText;
    this.socketService.emit("new-slogan", {
      slogan: newSlogan,
      room: this.roomCode,
      username: this.username
    });
    console.log(newSlogan);
    this.sloganForm.setValue({ sloganText: "" });
  }
}

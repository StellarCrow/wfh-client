import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NotificationService} from '../../../../core/services/notification.service';
import {DataService} from '../../../../core/services/data.service';
import {LocalStorageService} from '../../../../core/services/local-storage.service';
import {IUser} from '../../../../shared/interfaces/user';
import {IAvatarUploadResponse} from '../../../../shared/interfaces/iavatar-upload-response';

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.scss']
})
export class FormUploadFileComponent implements OnInit {
  public formUploadFile: FormGroup;
  public image: SafeResourceUrl = '';
  public errorText = '';
  private maxSize = 5120;
  private imageFile: string;
  private errorDialog = false;

  constructor(private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private notificationService: NotificationService,
              private localStorageService: LocalStorageService,
              private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.formUploadFile = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    const file = this.formUploadFile.value.file;
    if (file) {
      const data = new FormData();
      data.append('image', this.imageFile);
      const user: IUser = this.localStorageService.getItem('user');

      this.dataService.uploadAvatar(user._id, data).subscribe((response: IAvatarUploadResponse) => {
          if (response.success) {
            user.avatar = response.payload.avatar;
            this.localStorageService.setItem('user', user);
            this.notificationService.notification$.next('Avatar was successfully updated.');
          } else {
            this.notificationService.notification$.next(response.error.message);
          }
        },
        error => {
          this.notificationService.notification$.next(error);
        });
    } else {
      this.notificationService.notification$.next('Please, choose file.');
    }
  }

  public onFileChange(event: any): void {
    const file = event.target.files;
    const {maxSize} = this;
    const imageFile = file[0];

    // check if user actually selected a file
    if (file.length > 0) {
      const size = imageFile.size / maxSize / 1024;

      if (size > 1) {
        // check whether the size is greater than the size limit
        this.errorDialog = true;
        this.errorText =
          'Your file is too big! Please select an image under 5MB';
      } else {
        // turn file into image URL
        const imageURL = URL.createObjectURL(imageFile);
        this.errorText = '';
        this.imageFile = imageFile;
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageURL);
      }
    }

  }

}

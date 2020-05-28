import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NotificationService} from '../../../../core/services/notification.service';
import {DataStoreService} from '../../../../core/services/data-store.service';

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
  private imageFile: object;
  private errorDialog = false;

  constructor(private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private notificationService: NotificationService,
              private dataStoreService: DataStoreService
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
      const userId = this.dataStoreService.currentUser._id;
    } else {
      this.notificationService.notification$.next('Please, choose file.');
    }
  }

  public onFileChange(event: any): void {
    const file = event.target.files;
    const { maxSize } = this;
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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Output() imageUploadedEvent = new EventEmitter<string | null>();
  form: FormGroup = new FormGroup({
    image: new FormControl(null),
  });

  private imageData: string | null = null;
  fileSize = 0;

  constructor() {}

  ngOnInit(): void {}

  onChange(event: Event) {
    if (!event || !event.target) return;
    const eventTarget = event.target as HTMLInputElement;
    const files = eventTarget.files;
    const file = files ? files[0] : null;
    this.fileSize = file ? file.size : 0;
    // TODO: Deny files bigger than 4MB
    if (!file) return;

    this.form.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageUploadedEvent.emit(this.imageData);
    this.form.reset();
    this.imageData = null;
    this.fileSize = 0;
  }
}

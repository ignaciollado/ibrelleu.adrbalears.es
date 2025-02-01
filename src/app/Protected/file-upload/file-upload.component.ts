import { Component, Input } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})

export class FileUploadComponent {
  displayedColumns: string[] = ['fileName', 'progress', 'status'];
  selectedFiles: File[] = [];
  existingFiles: string[] = [];
  uploadProgress: { [key: string]: number } = {};
  uploadError: { [key: string]: string } = {};
  uploadSuccess: { [key: string]: string } = {};

  @Input() id: string;
  @Input() origin: string;


  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.loadExistingFiles(this.id);
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.uploadProgress = {};
    this.uploadError = {};
    this.uploadSuccess = {};
  }

  onUpload(): void {
    this.fileUploadService.upload(this.selectedFiles, this.id, this.origin).subscribe(
      event => {
        if (event.status === 'progress') {
          this.uploadProgress[event.fileName] = event.percentDone;
        } else if (event.status === 'success') {
          this.uploadSuccess[event.fileName] = 'Upload successful';
        } else if (event.status === 'error') {
          this.uploadError[event.fileName] = event.message || 'Upload failed. Please try again.';
        }
      },
      error => {
        this.uploadError['general'] = 'Upload failed. Please try again.';
        console.error('Upload failed', error);
      }
    );
  }

  onCancelUpload(): void {
    this.fileUploadService.cancelUpload();
    this.selectedFiles.forEach(file => {
      this.uploadProgress[file.name] = 0;
    });
  }
  
  loadExistingFiles(id:string): void {
    console.log ("load account files id: ", id, this.origin)
    this.fileUploadService.listFiles(id, this.origin).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.existingFiles = response.files
        } else {
          console.error('Failed to load existing files', response.message);
        }
      },
      error => {
        console.error('Failed to load existing files', error);
      }
    );
  }
}
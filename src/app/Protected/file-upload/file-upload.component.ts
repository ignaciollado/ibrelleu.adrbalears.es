import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadService } from '../../Services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  fileDataSource = new MatTableDataSource<File>();
  displayedColumns: string[] = ['fileName', 'action'];
  uploadProgress: number = 0

  constructor(private uploadService: FileUploadService) {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const fileArray: File[] = Array.from(files);
    this.fileDataSource.data = fileArray;
  }

  cancelUpload(file: File) {
    this.fileDataSource.data = this.fileDataSource.data.filter(f => f !== file);
  }

uploadFiles() {
  const files = this.fileDataSource.data;
  this.uploadService.upload(files).subscribe(progress => {
    this.uploadProgress = progress;
  }, error => {
    console.error('Upload failed', error);
  });

}

}

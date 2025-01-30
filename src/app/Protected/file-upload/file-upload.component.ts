import { Component } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  files: File[] = [];
  progress: number[] = [];
  statuses: { name: string, status: string }[] = [];
  errorMessage: string = '';

  constructor(private uploadService: FileUploadService) {}

  onFilesSelected(event: any): void {
    this.files = Array.from(event.target.files);
    this.progress = new Array(this.files.length).fill(0);
    this.statuses = this.files.map(file => ({ name: file.name, status: 'Pending' }));
  }

  uploadFiles(): void {
    if (this.files.length > 0) {
      this.uploadService.upload(this.files).subscribe(
        event => {
          if (event.progress !== undefined) {
            this.progress = this.progress.map((p, index) => event.progress);
            this.statuses = event.files;
          }
        },
        error => this.errorMessage = 'Error al cargar los archivos: ' + error.message
      );
    }
  }

  cancelUpload(): void {
    this.uploadService.cancelUpload();
    this.progress = new Array(this.files.length).fill(0);
    this.statuses = this.files.map(file => ({ name: file.name, status: 'Cancelled' }));
    this.errorMessage = 'Carga cancelada';
  }
}

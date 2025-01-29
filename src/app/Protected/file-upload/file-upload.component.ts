import { Component } from '@angular/core'
import { FileUploadService } from '../../Services/file-upload.service'
import { MatTableDataSource } from '@angular/material/table'

interface FileUploadStatus {
  fileName: string;
  status: string;
}

@Component({
  selector: 'adr-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
    selectedFiles: File[] = []
    uploadProgress: number = 0
    uploadError: string = ''
    displayedColumns: string[] = ['fileName', 'status']
    dataSource = new MatTableDataSource<FileUploadStatus>()

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
      this.selectedFiles = Array.from(event.target.files);
      this.dataSource.data = this.selectedFiles.map(file => ({ fileName: file.name, status: 'Pending' }))
  }

  onUpload() {
    this.uploadProgress = 0;
    this.uploadError = '';

    this.fileUploadService.upload(this.selectedFiles).subscribe(
      progress => {this.uploadProgress = progress
                    console.log ("progress: ", this.uploadProgress)
      },
      error => {this.uploadError = error
                console.log ("error: ", this.uploadError)
                },
      () => {
        this.dataSource.data = this.dataSource.data.map(file => ({ ...file, status: 'Uploaded' }));
      }
    );
  }
}
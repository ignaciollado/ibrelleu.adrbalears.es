import { Component, Input } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})

export class FileUploadComponent {
  progress = 0;
  isLoading = false;
  showConfirmation = false;
  displayedColumns: string[] = ['fileName', 'progress', 'status'];
  displayedColumnsList: string[] = ['fileName', 'action'];

  uploadedFiles: any[] = [];
  selectedFiles: File[] = [];
  existingFiles: string[] = [];
  uploadProgress: { [key: string]: number } = {};
  uploadError: { [key: string]: string } = {};
  uploadSuccess: { [key: string]: string } = {};
  dataSource = new MatTableDataSource<any>();

  @Input() id: string;
  @Input() origin: string;


  constructor(private fileUploadService: FileUploadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadExistingFiles(this.id);
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.showConfirmation = true;
    this.uploadProgress = {};
    this.uploadError = {};
    this.uploadSuccess = {};
  }

  confirmUpload() {
    const id = this.id; // Reemplaza con el ID real
    const foldername =  this.origin; // Reemplaza con el nombre de la carpeta real
    this.uploadFiles(this.selectedFiles, id, foldername);
    this.showConfirmation = false;
  }

  onUpload(): void {
    this.isLoading = true;
    this.fileUploadService.upload(this.selectedFiles, this.id, this.origin).subscribe (  event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadedFiles.push(...this.selectedFiles);
            this.progress = 0; // Reset progress after successful upload
            this.isLoading = false;
            this.snackBar.open('Files uploaded successfully!', 'Close', { duration: 3000 });
          }
      },
      error => {
        this.isLoading = false;
        this.snackBar.open(error, 'Close', {
          duration: 3000
        });
      });
    }

  uploadFiles(files: File[], id: string, foldername: string) {
      this.isLoading = true;
      this.fileUploadService.upload(files, id, foldername).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.uploadedFiles.push(...files);
          this.dataSource.data = this.uploadedFiles;
          this.progress = 0; // Reset progress after successful upload
          this.isLoading = false;
          this.snackBar.open('Files uploaded successfully!', 'Close', { duration: 3000 });
          this.selectedFiles = []
          this.loadExistingFiles(this.id)
        }
      }, error => {
        this.isLoading = false;
        this.snackBar.open(error, 'Close', {
          duration: 3000
        });
      });
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

  deleteFile(file: any) {
    const id = this.id; // Reemplaza con el ID real
    const foldername = this.origin; // Reemplaza con el nombre de la carpeta real
    this.fileUploadService.deleteFile(file.name, id, foldername).subscribe(response => {
      this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== file.name);
      this.dataSource.data = this.uploadedFiles; // Actualizar la tabla
      this.snackBar.open('File deleted successfully!', 'Close', {
        duration: 3000
      });
    }, error => {
      this.snackBar.open(error, 'Close', {
        duration: 3000
      });
    });
  }
}
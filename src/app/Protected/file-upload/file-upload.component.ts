import { Component, Input } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
  progress = 0;
  isLoading = false;
  showConfirmation = false;
  displayedColumns: string[] = ['fileName', 'progress', 'status'];
  displayedColumnsList: string[] = ['name', 'size', 'progress', 'actions'];

  uploadedFiles: any[] = [];
  selectedFiles: File[] = [];
  existingFiles: string[] = [];
  uploadProgress: { [key: string]: number } = {};
  uploadError: { [key: string]: string } = {};
  uploadSuccess: { [key: string]: string } = {};
  dataSource = new MatTableDataSource<any>();
  existingFilesDataSource = new MatTableDataSource<any>(); 
  
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
    const id = this.id;
    const foldername =  this.origin;
    this.uploadFiles(this.selectedFiles, id, foldername);
    this.showConfirmation = false;
  }

/*   onUpload(): void {
    this.isLoading = true;
    this.fileUploadService.upload(this.selectedFiles, this.id, this.origin).subscribe (  event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadedFiles.push(...this.selectedFiles);
            this.progress = 0;
            this.isLoading = false;
            this.showSnackBar ('Files uploaded successfully!');
          }
      },
      error => {
        this.isLoading = false;
        this.showSnackBar (error);
      });
    } */

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
          this.showSnackBar ('Successfully files uploaded localy!');
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
    this.fileUploadService.listFiles(id, this.origin).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.existingFiles = response.files
          this.showSnackBar ('Loaded existing files!!');
        } else {
          this.showSnackBar ('Failed to load existing files ' + response.message);
        }
      },
      error => {
        this.showSnackBar ('Failed to load existing files '+ error.message);
      }
    );
  }

  deleteFile(file: any) {
    const id = this.id; 
    const foldername = this.origin;
    this.fileUploadService.deleteFile(file, id, foldername).subscribe(response => {
      this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== file.name);
      /* this.existingFilesDataSource.data = this.existingFiles */
      this.loadExistingFiles(this.id)
      this.showSnackBar ('File deleted successfully!');
    }, error => {
      this.showSnackBar (error);
    });
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'Close', { duration: 20000, verticalPosition: 'bottom', 
      horizontalPosition: 'center' });
  }
}
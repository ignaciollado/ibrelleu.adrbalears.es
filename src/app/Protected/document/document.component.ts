7
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from '../../Services/document.service';
//import { FilecontentdialogComponent } from '../filecontentdialog/filecontentdialog.component';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documents: any[] = [];
  selectedFiles: File[] = [];
  foldername:string = '';
  subfolderId:string;
  message: string = '';
  progress: number = 0

  @Input() id: string;
  @Input() origin: string;

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.foldername = this.origin
    this.subfolderId = this.id
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments(this.foldername, this.subfolderId).subscribe(
      (data) => {
        this.documents = data
        this.showSnackBar("Documents listed successfully!!")
      },
      (error) => this.showSnackBar(error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadDocuments() {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach(file => formData.append('documents[]', file, file.name));

      this.documentService.uploadDocuments(this.foldername, this.subfolderId, formData).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / (event.total ?? 1));
          } else if (event.type === HttpEventType.Response) {
            this.showSnackBar('Documents uploaded successfully!');
            this.loadDocuments();
            this.selectedFiles = [];
            this.progress = 0;
          }
        },
        (error) => this.showSnackBar(error)
      );
    }
  }

  viewDocument(url: string) {
    window.open(url, '_blank');
  }

  deleteDocument(docName: string) {
    this.documentService.deleteDocument(this.foldername, this.subfolderId, docName).subscribe(
      (response) => {
        this.documents = this.documents.filter(doc => doc.id !== docName);
        this.showSnackBar('Document deleted successfully!');
        this.loadDocuments();
      },
      (error) => this.showSnackBar(error)
    );
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'Close', { duration: 20000, verticalPosition: 'top', 
      horizontalPosition: 'center', panelClass: ["custom-snackbar"]} );
  }

 /*  openFileContent(document: any) {
    this.dialog.open(FileContentDialogComponent, {
      data: { name: document.name, path: document.path }
    });
  } */
}

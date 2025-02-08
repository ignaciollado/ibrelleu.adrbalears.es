7
import { Component, OnInit } from '@angular/core';
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
  foldername = 'nacho';
  subfolderId = 1001;
  message = '';
  progress = 0;

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments(this.foldername, this.subfolderId).subscribe(
      (data) => {
        this.documents = data
        this.snackBar.open("Documents listed successfully!!", 'Close', { duration: 30000 })
      },
      (error) => this.snackBar.open(error, 'Close', { duration: 30000 })
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
            this.snackBar.open('Documents uploaded successfully!', 'Close', { duration: 30000 });
            this.loadDocuments();
            this.selectedFiles = [];
            this.progress = 0;
          }
        },
        (error) => this.snackBar.open(error, 'Close', { duration: 30000 })
      );
    }
  }

  deleteDocument(docId: number) {
    this.documentService.deleteDocument(this.foldername, this.subfolderId, docId).subscribe(
      (response) => {
        this.snackBar.open('Document deleted successfully!', 'Close', { duration: 3000 });
        this.loadDocuments();
      },
      (error) => this.snackBar.open(error, 'Close', { duration: 3000 })
    );
  }

 /*  openFileContent(document: any) {
    this.dialog.open(FileContentDialogComponent, {
      data: { name: document.name, path: document.path }
    });
  } */
}

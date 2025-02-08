import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../../Services/document.service';
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

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadDocuments()
  }

  loadDocuments() {
    this.documentService.getDocuments(this.foldername, this.subfolderId)
    .subscribe(
      (data) => {
        this.documents = data
        this.showSnackBar("Files listed successfully!!")
      },
      (error) => this.showSnackBar(error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files)
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
            this.showSnackBar('Documents uploaded successfully!')
            this.loadDocuments();
            this.selectedFiles = [];
            this.progress = 0;
          }
        },
        (error) => this.showSnackBar(error)
      );
    }
  }

  deleteDocument(docId: number) {
    this.documentService.deleteDocument(this.foldername, this.subfolderId, docId).subscribe(
      (response) => {
        this.showSnackBar('Document deleted successfully!')
        this.loadDocuments();
      },
      (error) => this.showSnackBar(error)
    );
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'Close', { duration: 50000, verticalPosition: 'top', 
      horizontalPosition: 'center', panelClass: ["custom-snackbar"]} );
  }
}

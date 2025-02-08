import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-content-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.name }}</h1>
    <div mat-dialog-content>
      <pre>{{ content }}</pre>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: [`
    pre {
      white-space: pre-wrap; /* Ensures text wraps within the pre tag */
    }
  `]
})
export class FileContentDialogComponent {
  content: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.loadFileContent(data.path);
  }

  loadFileContent(filePath: string) {
    fetch(filePath)
      .then(response => response.text())
      .then(text => this.content = text)
      .catch(error => console.error('Error loading file content:', error));
  }
}


import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Download } from './download/download';
import { DownloadService } from './download/download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'download-poc';
  slides =
    {
      name: 'Mobile Cross-Platform from a Progressive Perspective',
      url: 'https://www.historia.uff.br/stricto/td/1453.pdf'
    };

  download$!: Observable<Download>

  constructor(private downloads: DownloadService,
              @Inject(DOCUMENT) private document: Document) {}

  download({name, url}: {name: string, url: string}) {
    this.download$ = this.downloads.download(url, name)
  }
}

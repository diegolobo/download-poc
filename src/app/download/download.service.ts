import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpRequest } from '@angular/common/http'
import { download, Download } from './download'
import { BehaviorSubject, catchError, Observable } from 'rxjs'
import { SAVER, Saver } from './saver.provider'

@Injectable({providedIn: 'root'})
export class DownloadService {

  constructor(
    private http: HttpClient,
    @Inject(SAVER) private save: Saver
  ) {
  }

  download(url: string, filename?: string): Observable<Download> {
    return this.http.get(url, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(
      download(blob => this.save(blob, filename)),
      catchError((error) => {
        alert("Deu ruim 2!");//TODO: Implementar popup de erro
        const downloadSubject: BehaviorSubject<Download> =
        new BehaviorSubject<Download>({ progress: 0, state: "ERROR", content: null });
        return downloadSubject.asObservable();
      })
      )
  }

  blob(url: string, filename?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}

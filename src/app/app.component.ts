import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
      name: 'Download by S3 - AWS',
      //url: 'https://s3.us-east-2.amazonaws.com/files.local.isa.audaces.com/pdf/lularaio.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJHMEUCIQC4tp09LozOv31auplyL3Ix8mHzy%2FTYvGCRAcBvvdDsggIgS5FIay9yM70GLIq9WRjuMgDGhfYIPNn27mklXWa9ktgq7QIIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NTQzMDg0MTIzNDkiDDNf1wDz5tsDzPib5CrBAlE7ss4mi5SuY3tA%2B5M7sDRxX5dZ2JmYDQf0tDlXJpQEwnALa0OxKdMhQLytLAd297qA24SB%2B%2F4t0YlmOvQzh4bQOu%2BwJ4QwnCIyIQt0%2F2WmKmBcyrr1l7Nr4q7eyhZSDEzLpTQVhTZBCis%2FjDT3O1n6BMJ7x7ZMV9Nw13JNj2keSwwC7R3ii86XO62gYzS7HQ%2BLtCpXFuhPUkeqUp33YGJEScCDAQ07oJGFg9Wz9YUqMI4C4EvrjMTi96tAZOn1ti%2FKMWBx4Dzw0zKn3TEs1OElJk%2FjQuneOMgcOjH5TpT0LgTaA3Ylyt8kksu%2B3emIkb2cKtCvqm2IKuUNH0Nu7%2FdfjQySlIhPSBC8ZHUaWVdJkTcLZHETtM6lVtT6wYOCTj0R5QCOjaDESRye0FuwhXZ4rS%2FMcmhuY9zxJGaE4bGGSzD6zYubBjqzAkqgWNjKUlSDZ8pshI5J3Wmlm8ovMmEDs11Kq9fIeiHfuc7jrTdqEKK67sd%2FhcJIMvWl8tj9d5NebSg0SUDbwL0ewtHytQHjpA9nW0YNCtx%2FDAryz0E0%2BaskMsLIXUdRWoXMRM0%2BMcehpQS04pQOcyGap42bYicqAsn%2BCGOBa%2FOBaCLdgoqGxekcLsmjkoFQ4QW4KpIMDB8XP4IJn7ECxolH2729pJ2VnfPcWmrztxislQAIc13IQbhZX6p%2BzC7ZdLDupQV9p4Y7UP4Z%2FxA%2B%2BTceTsZ6B%2BuX5ZOC0B3hOCIiBajRe77OqhaMx3awOKHkRQzCktAVC3TiT7ltRMr3acpDCt3uGZdZtIm525Y6m8rroDS6t5xyeMqecvTGxopjt2OKf75Ny97rR0kiwpKo0c%2BaqXc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221102T215439Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA27ICI6O64PHJ7U5V%2F20221102%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=9d81b01f589154615c592294ade51d9e2f5b8a3df307ea72bc86670ce71c61cc'
      //url: 'https://s3.us-east-2.amazonaws.com/files.local.isa.audaces.com/pdf/boleto%20%281%29.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJHMEUCIQC4tp09LozOv31auplyL3Ix8mHzy%2FTYvGCRAcBvvdDsggIgS5FIay9yM70GLIq9WRjuMgDGhfYIPNn27mklXWa9ktgq7QIIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NTQzMDg0MTIzNDkiDDNf1wDz5tsDzPib5CrBAlE7ss4mi5SuY3tA%2B5M7sDRxX5dZ2JmYDQf0tDlXJpQEwnALa0OxKdMhQLytLAd297qA24SB%2B%2F4t0YlmOvQzh4bQOu%2BwJ4QwnCIyIQt0%2F2WmKmBcyrr1l7Nr4q7eyhZSDEzLpTQVhTZBCis%2FjDT3O1n6BMJ7x7ZMV9Nw13JNj2keSwwC7R3ii86XO62gYzS7HQ%2BLtCpXFuhPUkeqUp33YGJEScCDAQ07oJGFg9Wz9YUqMI4C4EvrjMTi96tAZOn1ti%2FKMWBx4Dzw0zKn3TEs1OElJk%2FjQuneOMgcOjH5TpT0LgTaA3Ylyt8kksu%2B3emIkb2cKtCvqm2IKuUNH0Nu7%2FdfjQySlIhPSBC8ZHUaWVdJkTcLZHETtM6lVtT6wYOCTj0R5QCOjaDESRye0FuwhXZ4rS%2FMcmhuY9zxJGaE4bGGSzD6zYubBjqzAkqgWNjKUlSDZ8pshI5J3Wmlm8ovMmEDs11Kq9fIeiHfuc7jrTdqEKK67sd%2FhcJIMvWl8tj9d5NebSg0SUDbwL0ewtHytQHjpA9nW0YNCtx%2FDAryz0E0%2BaskMsLIXUdRWoXMRM0%2BMcehpQS04pQOcyGap42bYicqAsn%2BCGOBa%2FOBaCLdgoqGxekcLsmjkoFQ4QW4KpIMDB8XP4IJn7ECxolH2729pJ2VnfPcWmrztxislQAIc13IQbhZX6p%2BzC7ZdLDupQV9p4Y7UP4Z%2FxA%2B%2BTceTsZ6B%2BuX5ZOC0B3hOCIiBajRe77OqhaMx3awOKHkRQzCktAVC3TiT7ltRMr3acpDCt3uGZdZtIm525Y6m8rroDS6t5xyeMqecvTGxopjt2OKf75Ny97rR0kiwpKo0c%2BaqXc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221102T220634Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA27ICI6O64PHJ7U5V%2F20221102%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=d23fbc40ee6a44b4df2a7a7f1b700d25eda86043c2ddb670debb40066f091d74'
      //url: 'https://nils-mehlhorn.de/slides/mobile_cp_progessive_mehlhorn_pottjs.pdf'
      // url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      url: '../assets/lularaio.jpg'
    };

  download$!: Observable<Download>

  constructor(private downloads: DownloadService,
              @Inject(DOCUMENT) private document: Document) {}

  download({name, url}: {name: string, url: string}) {
    this.download$ = this.downloads.download(url, name);
  }
}

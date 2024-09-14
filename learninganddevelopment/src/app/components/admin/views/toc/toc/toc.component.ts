import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneratePdfService } from '../../../../../services/admin/generate-pdf.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrl: './toc.component.css'
})
export class TocComponent implements OnInit {
  requestId: string | null = null;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  constructor(private route: ActivatedRoute, private pdfService: GeneratePdfService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.requestId = params['requestId'];
      console.log('Request ID:', this.requestId);
    });
  }



  public downloadPdf(): void {
    const content = this.contentToConvert.nativeElement;
    this.pdfService.generatePdf(content, 'downloaded-file.pdf');
  }
}

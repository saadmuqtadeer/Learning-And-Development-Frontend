import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TrainingRequestsService } from '../../../../../services/admin/training-requests.service';
import { TocService } from '../../../../../services/admin/toc.service';
import { GeneratePdfService } from '../../../../../services/admin/generate-pdf.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent implements OnInit {
  request: any;
  aiResponse: string | null = null;

  @ViewChild('tocContent') tocContent!: ElementRef;

  constructor(
    private trService: TrainingRequestsService, 
    private tocService: TocService,
    private pdfService: GeneratePdfService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const requestId = +params['requestId'];
      if (requestId) {
        this.loadRequestDetails(requestId);
      }
    });
  }

  loadRequestDetails(requestId: number): void {
    this.trService.getRequestsById(requestId).subscribe(
      (request) => {
        this.request = request;
      },
      (error) => {
        console.error('Error fetching request details:', error);
      }
    );
  }

  generateToc(): void {
    const prompt = `Generate a table of contents for the following training request: ${JSON.stringify(this.request)}`;
    // this.tocService.generateToc(prompt).subscribe(
    //   (response) => {
    //     this.aiResponse = response.choices[0].message.content;
    //   },
    //   (error) => {
    //     console.error('Error generating TOC:', error);
    //   }
    // );
  }

  downloadPdf(): void {
    if (this.tocContent) {
      this.pdfService.generatePdf(this.tocContent.nativeElement, 'toc.pdf');
    }
  }
}

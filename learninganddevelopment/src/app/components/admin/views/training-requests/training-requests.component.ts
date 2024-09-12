import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../../services/signal-r.service';

@Component({
  selector: 'app-training-requests',
  templateUrl: './training-requests.component.html',
  styleUrls: ['./training-requests.component.css']
})
export class TrainingRequestsComponent implements OnInit {
  messages: string[] = []; // Define messages property
  isConnected: boolean = false; // Track connection status

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.initializeSignalRConnection();
  }

  private initializeSignalRConnection() {
    this.signalRService.startConnection();
    this.signalRService.addReceiveMessageListener(message => {
      this.messages.push(message); // Update messages property
    });
  }
}

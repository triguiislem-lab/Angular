import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/services/pub.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  publicationCount: number = 0;

  constructor(private pubService: PubService) {}

  ngOnInit(): void {
    this.pubService.getAllPub().subscribe({
      next: (publications) => {
        this.publicationCount = publications.length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des publications', err);
      }
    });
  }
}

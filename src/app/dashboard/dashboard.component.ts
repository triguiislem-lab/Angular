import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { PubService } from 'src/services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})export class DashboardComponent implements OnInit {
  publicationCount: number = 0;
  memberCount: number = 0;
  eventCount: number = 0;
  studentCount: number = 0;
  teacherCount: number = 0;
  villesfax: number = 0;
  villetunisie: number = 0;
  villesousse: number = 0;
  villesmonastir: number = 0;
  villesbizerte: number = 0;

  chartData: ChartDataset[] = [];
  chartLabels: string[] = ['Student','Teacher'];
  chartOptions: ChartOptions = {};
  MembersData: any[] = [];
  chartDatadoughnut: ChartDataset[]=[];
  chartLabelsdoughnut: string[] = ['Sfax','Tunisie','sousse','monastir','bizerte'];
  eventData: any[]=[];

  constructor(
    private pubService: PubService,
    private memberService: MemberService,
    private evtService: EventService
  ) {}

  ngOnInit(): void {
    // Récupérer les publications
    this.pubService.getAllPub().subscribe({
      next: (publications) => {
        this.publicationCount = publications.length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des publications', err);
      }
    });

    // Récupérer les membres
    this.memberService.getAllMembers().subscribe({
      next: (members) => {
        this.memberCount = members.length;
        this.MembersData = members;

        // Compter students et teachers
        this.studentCount = 0;
        this.teacherCount = 0;

        for (let i = 0; i < this.MembersData.length; i++) {
          if (this.MembersData[i].type === 'student') {
            this.studentCount++;
            console.log(this.studentCount);
          } else if (this.MembersData[i].type === 'teacher') {
            this.teacherCount++;
            console.log(this.teacherCount);
          }
        }

        // Initialiser le graphique
        this.chartData = [
          {
            label: 'Members',
            data: [this.studentCount, this.teacherCount]
          }
        ];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des membres', err);
      }
    });


    // Récupérer les événements
    this.evtService.getAllEvents().subscribe({
      next: (events) => {
        this.eventCount = events.length;
        this.eventData = events;

        for (let i = 0; i < this.eventData.length; i++) {
          if (this.eventData[i].lieu === 'Sfax') {
            this.villesfax++;
          } else if (this.eventData[i].lieu === 'Tunisie') {
            this.villetunisie++;
            console.log(this.villetunisie);
          } else if (this.eventData[i].lieu === 'sousse') {
            this.villesousse++;
            console.log(this.villesousse);
          } else if (this.eventData[i].lieu === 'Monastir') {
            this.villesmonastir++;
            console.log(this.villesmonastir);
          } else if (this.eventData[i].lieu === 'Bizerte') {
            this.villesbizerte++;
            console.log(this.villesbizerte);
          }
        } 
        this.chartDatadoughnut = [
          {
            label: 'Events',
            data: [this.villesfax, this.villetunisie, this.villesousse, this.villesmonastir, this.villesbizerte]
          }
        ];

    

      },
      error: (err) => {
        console.error('Erreur lors de la récupération des événements', err);
      }
    });
  }
}

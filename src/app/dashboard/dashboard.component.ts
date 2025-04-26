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
  chartLabelsdoughnut: string[] = [];
  eventData: any[]=[];
  publicationData: any[]=[];
  chartDataBar: ChartDataset[]=[];
  chartLabelBar: string[]=[];
  chartDataLine: ChartDataset[]=[];
  chartLabelLine: string[]=[];

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
        this.publicationData = publications;

// Initialiser le compteur par type
const publicationTypesCount: { [type: string]: number } = {};

// Compter les publications par type
for (let publication of this.publicationData) {
  const type = publication.type.toLowerCase(); // pour éviter les erreurs de casse
  if (publicationTypesCount[type]) {
    publicationTypesCount[type]++;
  } else {
    publicationTypesCount[type] = 1;
  }
}

// Mettre à jour les labels et données pour le graphique
this.chartLabelBar = Object.keys(publicationTypesCount); // ajoute ceci dans ton component
this.chartDataBar = [
  {
    label: 'Publications par type',
    data: Object.values(publicationTypesCount)
  }
];

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
    
        // Initialiser le graphique student/teacher
        this.chartData = [
          {
            label: 'Members',
            data: [this.studentCount, this.teacherCount]
          }
        ];
    
        // 💥💥💥 ICI on calcule publicationsParMembre après avoir récupéré les membres
        const publicationsParMembre: { [nom: string]: number } = {};
    
        for (let membre of this.MembersData) {
          const nom = membre.nom;
          const nombreDePublications = membre.tabPub ? membre.tabPub.length : 0;
          publicationsParMembre[nom] = nombreDePublications;
        }
    
        this.chartLabelLine = Object.keys(publicationsParMembre);
        this.chartDataLine = [
          {
            label: 'Nombre de publications par membre',
            data: Object.values(publicationsParMembre)
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
    
        // Nouveau code dynamique
        const cityCountMap: { [city: string]: number } = {};
    
        for (let event of this.eventData) {
          const city = event.lieu.toLowerCase();  // rendre insensible à la casse
          if (cityCountMap[city]) {
            cityCountMap[city]++;
            console.log(cityCountMap[city]);
          } else {
            cityCountMap[city] = 1;
            console.log(cityCountMap[city]);
          }
        }
    
        // Construire dynamiquement les labels et data
        this.chartLabelsdoughnut = Object.keys(cityCountMap);
        this.chartDatadoughnut = [
          {
            label: 'Events',
            data: Object.values(cityCountMap),
          }
        ];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des événements', err);
      }
    });
    
  }
}

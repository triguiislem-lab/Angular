import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/Models/Evt';
import { EvtService } from 'src/Services/evt.service';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VisibilityPubComponent } from '../visibility-pub/visibility-pub.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
openVisibility(id: string) {
  const x = new MatDialogConfig()
  x.data=id
  const DialogRef=this.dialog.open(VisibilityPubComponent,x)
}

  dataSource: MatTableDataSource<Evt> = new MatTableDataSource<Evt>([]);
  displayedColumns: string[] = ['id', 'titre', 'datedebut', 'datefin', 'lieu', 'icon'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Es: EvtService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    this.Es.getAllEvents().subscribe((response) => {
      this.dataSource.data = response;

      // Initialisation après mise à jour des données
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open() {
    const dialogRef = this.dialog.open(ModalEvtComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Nouveau événement ajouté :", result);
        this.Es.addEvent(result).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  openEdit(id: string) {
    this.Es.getEventById(id).subscribe((evt) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = evt;

      const dialogRef = this.dialog.open(ModalEvtComponent, dialogConfig);

      // Après la fermeture du modal, rafraîchir les données
      dialogRef.afterClosed().subscribe(updated => {
        if (updated) {
          console.log("Événement mis à jour :", updated);
          this.fetchData();
        }
      });
    });
  }
  deleteEvent(id: string) {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      this.Es.deleteEvent(id).subscribe(() => {
        console.log("Événement supprimé avec succès !");
        this.fetchData(); // Rafraîchir la liste après suppression
      }, error => {
        console.error("Erreur lors de la suppression :", error);
      });
    }
  }
  
}

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pub } from 'src/models/Pub';
import { PubService } from 'src/services/pub.service'; // Assure-toi que le chemin est correct
import { ModalPubComponent } from '../modal-pub/modal-pub.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css'],
})
export class PubComponent {
  displayedColumns: string[] = ['id',"cin", 'titre', 'type', 'item', 'date', 'sourcePDf','actions'];
  //dataSource = new MatTableDataSource([]);
  dataSource= new MatTableDataSource<Pub>();
  constructor(private pubService: PubService,private dialog: MatDialog) {
    this.loadPubs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPubs(): void {

    this.pubService.getAllPub().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalPubComponent, {
      width: '600px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPubs(); // recharge la liste si une pub a été ajoutée
      }
    });
  }
  editPub(pub: Pub): void {
    const dialogRef = this.dialog.open(ModalPubComponent, {
      width: '600px',
      data: pub
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPubs();
      }
    });
  }
  
  deletePub(id: string): void {
    if (confirm("Are you sure you want to delete this publication?")) {
      this.pubService.deletePub(id).subscribe(() => {
        this.loadPubs();
      });
    }

  }

}

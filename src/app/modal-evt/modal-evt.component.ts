import { Component, Inject, OnInit } from '@angular/core';
import { EvtService } from 'src/Services/evt.service'; // Ajuster le chemin si nécessaire
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/Models/Evt';

@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent implements OnInit {
  form!: FormGroup;
  dataSource = new MatTableDataSource<Evt>(); // Initialisation immédiate

  constructor(
    private ES: EvtService,
    public dialogRef: MatDialogRef<ModalEvtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.fetchData(); // Appel de fetchData après l'initialisation
    this.form = new FormGroup({
      titre: new FormControl(this.data?.titre || '', Validators.required),
      datedebut: new FormControl(this.data?.datedebut || '', Validators.required),
      datefin: new FormControl(this.data?.datefin || '', Validators.required),
      lieu: new FormControl(this.data?.lieu || '', Validators.required)
    });

    if (this.data) {
      console.log("Données reçues :", this.data);
    } else {
      console.log("Aucune donnée reçue ou erreur dans les données.");
    }
  }

  save() {
    if (this.form.valid) {
      console.log("Données validées et envoyées : ", this.form.value);
      this.ES.updateEvent(this.data.id, this.form.value).subscribe(() => {
        this.fetchData(); // Mettre à jour après la requête
        this.dialogRef.close(true); // Fermer le dialogue et signaler la mise à jour
      });
    } else {
      console.log("Formulaire invalide", this.form.errors);
    }
  }

  fetchData() {
    this.ES.getAllEvents().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response); // Nouvelle référence pour rafraîchir
    });
  }

  close() {
    this.dialogRef.close();
  }
}

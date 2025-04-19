import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PubService } from 'src/services/pub.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})

export class ModalPubComponent {
  selectedFood: string = '';
  isEditMode: boolean = false;
  foods: Food[] = [
    {value: 'conf', viewValue: 'conf'},
    {value: 'journal', viewValue: 'journal'},
    {value: 'mag', viewValue: 'mag'},
  ];
  form: any;
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalPubComponent>,
    private pubService: PubService,
    @Inject(MAT_DIALOG_DATA) public data: any // <-- c’est ici qu’on injecte les données
  ) {
    this.form = this.fb.group({
      cin: [data?.cin || ''],
      titre: [data?.titre || ''],
      type: [data?.type || ''],
      item: [data?.item || ''],
      date: [data?.date || ''],
      sourcePDf: [data?.sourcePDf || '']
    });
  
    this.isEditMode = !!data;
  }
  

  onCancel() {
    // Close dialog or reset form logic
    this.dialogRef.close(false);

  }

  onSubmit() {
    if (this.form.valid) {
      const pubData = this.form.value;
      let operation;
  
      if (this.isEditMode) {
        // Appelle ici une méthode de mise à jour (ex: updatePub(pubData))
        // operation = this.pubService.updatePub(pubData);
        operation = this.pubService.updatePub(this.data.id, pubData); // Update call with ID
      } else {
        operation = this.pubService.addPub(pubData);
      }
  
      operation?.subscribe({
        next: () => this.dialogRef.close(true),
        error: (error: any) => console.error('Error saving publication:', error)
      });
    }
  }
  
  }




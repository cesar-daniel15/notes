import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
 // Array de tarefas
tasks: string[] = [
  'Levar o carro à inspeção',
  'Fazer compras no supermercado',
  'Estudar para o exame',
  'Limpar a casa',
];

constructor(private modalCtrl: ModalController) {}

    async openNoteModal(task: String){
      const modal = await this.modalCtrl.create({
        component: NoteModalComponent,
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      if (role === 'confirm') {
       // this.message = `Hello, ${data}!`;
      }
    }
  }



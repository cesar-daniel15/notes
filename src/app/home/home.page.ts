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
tasks: any[] = [
  {
    "name" : "Limpar a casa",
    "state" : "Todo",
    "priority": "Normal"
  },
  {
    "name" : "Limpar carro",
    "state" : "Todo",
    "priority": "Normal"
  }
];

constructor(private modalCtrl: ModalController) {}

    async openNoteModal(task: String){
      const modal = await this.modalCtrl.create({
        component: NoteModalComponent,
        backdropDismiss: false,
        componentProps: { task: task },  // Passa a task como um parametro
      });
      
      modal.onWillDismiss().then((detail) => {
        if (detail.role === 'confirm') {
          // Aqui você pode capturar a tarefa editada ou confirmada
          console.log(`Tarefa confirmada: ${detail.data}`);
        }
      });
  
      return await modal.present();
    }
  }



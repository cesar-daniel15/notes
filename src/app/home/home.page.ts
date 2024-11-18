import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { NoteCreateModalComponent } from '../note-create-modal/note-create-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Valor default da prioridade
  selectedSegment: string = 'Todo';

  // Array de tarefas com estado e prioridade
  tasks: any[] = [
    {
      name: 'Limpar a casa',
      state: 'Todo',
      priority: 'Normal'
    },
    {
      name: 'Limpar carro',
      state: 'Done',
      priority: 'Normal'
    }
  ];

  constructor(private modalCtrl: ModalController) {}

  async openNoteModal(task: string) {
    const modal = await this.modalCtrl.create({
      component: NoteModalComponent,
      backdropDismiss: false,
      componentProps: { task: task }  // Passa a tarefa como uma propriedade
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.role === 'delete') {
        this.deleteTask(task);
      }
    });
    await modal.present();
  }

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: NoteCreateModalComponent,
      backdropDismiss: false,
      componentProps: {}
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (data && data.message) {
      
      }
  }

  // Metodo para apagar tarefa
  deleteTask(taskToDelete: any) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
  }

  // Metodo para retornar tarefas filtradas
  getFilteredTasks() {
    return this.tasks.filter(task => task.state === this.selectedSegment);
  }
}

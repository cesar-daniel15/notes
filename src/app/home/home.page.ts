import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { NoteCreateModalComponent } from '../note-create-modal/note-create-modal.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

enum State {
  TODO = 'TODO',
  DONE = 'DONE',
}

enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  CRITICAL = 'CRITICAL',
}

interface Note{ 
  id: string; 
  description: string; 
  state: State; 
  priority: Priority; 
  createdBy: string; 
  createdAt: string; 
  updatedBy: string | null; 
  updatedAt: string | null; 
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiUrl: string = "https://mobile-api-one.vercel.app/api";
  name: string = "cesar.daniel@ipvc.pt";
  password: string = "uVt(D!u3";

  selectedSegment: string = State.TODO;
  notes: any[] = [];

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private http: HttpClient) {}

  // Funcao para obter todas as notas existentes
  async getNotes() {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    try {
      this.notes = await firstValueFrom(this.http.get<Note[]>(`${this.apiUrl}/notes`, { headers }));
      loading.dismiss();
      if(this.notes.length == 0) {
        await this.presentToast(`There is no notes available 😥`, 'warning');
      }
      else {
        await this.presentToast(`Success getting ${this.notes.length} notes 🚀`, 'success');
      }
      
    } catch (error : any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // Funcao apra abrir o modal da nota
  async openNoteModal(note: Note) {
    const modal = await this.modalCtrl.create({
      component: NoteModalComponent,
      backdropDismiss: false,
      componentProps: { note: note } 
    });

    await modal.present();
  }

  // Funcao para abrir o modal para criar
  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: NoteCreateModalComponent,
      backdropDismiss: false,
      componentProps: {}
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (data && data.message) {
        await this.getNotes();
      }
  }
  
  // Mostra animacao de login
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...',
      duration: 3000,
    });

    loading.present();
    return loading;
  }

  // Mostra mensagem de feedback
  async presentToast(message: string, color: string = 'success') {
    const toast = document.createElement('ion-toast');
    toast.message = message;  
    toast.color = color;     
    toast.duration = 2000;  
    
    document.body.appendChild(toast);  
    await toast.present();
  }

   // Metodo para retornar tarefas filtradas
  getFilteredNotes() {
    return this.notes.filter(note => note.state === this.selectedSegment);
  }
  
}

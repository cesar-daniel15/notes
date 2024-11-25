import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';

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
  selector: 'app-note-create-modal',
  templateUrl: './note-create-modal.component.html',
  styleUrls: ['./note-create-modal.component.scss'],
})

export class NoteCreateModalComponent {

  apiUrl: string = "https://mobile-api-one.vercel.app/api";
  name: string = "cesar.daniel@ipvc.pt";
  password: string = "uVt(D!u3";

  selectedSegment: string = 'Todo';
  notes: any[] = [];

  description: string = '';
  selectedState: State = State.TODO;
  selectedPriority: Priority = Priority.NORMAL;  

  State = State; 
  Priority = Priority

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private http: HttpClient) {}

  // Funcao para cria uma nova nota -> POST: /notes
  async postNote() {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    var newNote = {
      description: this.description,
      state: this.selectedState,
      priority: this.selectedPriority,
    }

    try {
      await firstValueFrom(this.http.post<Note[]>(`${this.apiUrl}/notes`, newNote , { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully created 🚀`, 'success');
      
    } catch (error : any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
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
  
  
  // Função para fechar o modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}

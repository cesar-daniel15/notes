import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
  selector: 'app-notemodal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent implements OnInit {
  apiUrl: string = "https://mobile-api-one.vercel.app/api";
  name: string = "cesar.daniel@ipvc.pt";
  password: string = "uVt(D!u3";
  
  note!: Note;
  description: string = '';
  selectedState: State = State.TODO;
  selectedPriority: Priority = Priority.NORMAL;  

  // Torna as enums acessiveis
  State = State; 
  Priority = Priority;

  constructor(private navParams: NavParams, private modalCtrl: ModalController,private loadingCtrl: LoadingController, private http: HttpClient) {}

  ngOnInit() {
  }

  async putNote() {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    var updatedNote = { 
      description: this.description, 
      state: this.selectedState, 
      priority: this.selectedPriority
      }

    try {
      await firstValueFrom(this.http.put<Note>(`${this.apiUrl}/notes/${this.note.id}`, updatedNote, { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully created 🚀`, 'success');
      
    } catch (error : any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  async deleteNote() {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/notes/${this.note.id}`, { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully deleted 🚀`, 'success');
      
    } catch (error : any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      role: 'cancel'
    });
  }

  confirm() {
    this.putNote();
    this.modalCtrl.dismiss({
      role: 'confirm',
    });
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
  
}
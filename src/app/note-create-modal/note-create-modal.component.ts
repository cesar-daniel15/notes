import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-create-modal',
  templateUrl: './note-create-modal.component.html',
  styleUrls: ['./note-create-modal.component.scss'],
})
export class NoteCreateModalComponent {
  note = {
    name: '',
    priority: 'Normal',
  };

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss({ note: this.note }, 'save');
  }
}

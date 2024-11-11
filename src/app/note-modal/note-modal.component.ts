import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

// Defina o tipo de 'task'
interface Task {
  name: string;
  state: string,
  priority: string
}

@Component({
  selector: 'app-notemodal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent implements OnInit {

  task: Task = { name: "", state: "", priority:"" };  

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss({
      role: 'cancel'
    });
  }

  confirm() {
    this.modalCtrl.dismiss({
      role: 'confirm',
      data: this.task  
    });
  }
}
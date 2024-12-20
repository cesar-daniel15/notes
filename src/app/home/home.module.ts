import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { NoteCreateModalComponent } from '../note-create-modal/note-create-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NoteModalComponent, NoteCreateModalComponent]
})
export class HomePageModule {}

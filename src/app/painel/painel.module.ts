import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PainelComponent } from './painel.component';

@NgModule({
  declarations: [
    PainelComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class PainelModule { }

import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeComponent } from './unidade.component';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    UnidadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class UnidadeModule { }

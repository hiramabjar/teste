import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { UnidadeModel } from './unidade.model';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss'],
})
export class UnidadeComponent implements OnInit {
  selectedValue: string = '';

  unidades: UnidadeModel[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(environment.url + '/painel/unidades').subscribe(
      (result) => {
        this.unidades = result;
      },
      (error) => {
        console.log('Erro de comunicação.');
      }
    );
  }

  ativarPainel() {
    if (this.selectedValue) {
      const unidadeSelecionada = this.unidades.filter(
        (item) => item.source === this.selectedValue
      );
      this.router.navigate(['painel'], {
        queryParams: {
          unidade: this.selectedValue,
          toque: unidadeSelecionada[0].toque,
        },
      });
    }
  }
}

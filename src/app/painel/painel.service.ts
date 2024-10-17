import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PainelService {
  // private dadosSubject = new BehaviorSubject<any>(null);
  // dados$ = this.dadosSubject.asObservable();

  salvarDados(dados: any): void {
    // this.dadosSubject.next(dados);
    localStorage.setItem('meusDados', JSON.stringify(dados)); // Salva os dados no localStorage
  }

  recuperarDados() {
    const dadosString = localStorage.getItem('meusDados');
    return dadosString ? JSON.parse(dadosString) : null;
  }
}

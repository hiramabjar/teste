import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, concat, map, takeUntil } from 'rxjs';
import { speak } from 'rxjs-tts';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SocketClientService } from './../websocket/socket-client.service';
import { AtendimentoModel } from './atendimento.model';
import { PainelService } from './painel.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss'],
})
export class PainelComponent implements OnInit {
  apiURL: string = '/painel/atendimentos';
  today: number = Date.now();
  atendimentoAtual: AtendimentoModel = {};
  atendimentoAnterior1: AtendimentoModel = {};
  atendimentoAnterior2: AtendimentoModel = {};
  atendimentoAnterior3: AtendimentoModel = {};
  atendimentoAnterior4: AtendimentoModel = {};
  atendimentoAnterior5: AtendimentoModel = {};
  toque = '';
  atual = '';
  images: any[] = [];
  currentImageIndex = 0;
  currentImage: { url: string } | undefined;
  showVideo: boolean = false; // Variável para alternar entre publicidade e vídeo

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private socketService: SocketClientService,
    private painelService: PainelService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    setInterval(() => {
      this.today = Date.now();
    }, 1);

    setInterval(() => {
      const dados = {
        atendimentoAnterior5: this.atendimentoAnterior5,
        atendimentoAnterior4: this.atendimentoAnterior4,
        atendimentoAnterior3: this.atendimentoAnterior3,
        atendimentoAnterior2: this.atendimentoAnterior2,
        atendimentoAnterior1: this.atendimentoAnterior1,
        atendimentoAtual: this.atendimentoAtual,
        currentImageIndex: this.currentImageIndex,
      };
      this.painelService.salvarDados(dados);
      window.location.reload();
    }, 300000);

    this.getNovasPublicidade();
    this.switchBetweenAdAndVideo(); // Chama a função de alternância
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.unidade) {
        this.toque = params.toque;
        this.onPost(params.unidade)
          .pipe(takeUntil(this.unsubscribeSubject))
          .subscribe((post) => {});
        this.getPublicidade();
      } else {
        this.router.navigate(['']);
      }
    });

    const dados = this.painelService.recuperarDados();
    this.atendimentoAnterior5 = dados.atendimentoAnterior5;
    this.atendimentoAnterior4 = dados.atendimentoAnterior4;
    this.atendimentoAnterior3 = dados.atendimentoAnterior3;
    this.atendimentoAnterior2 = dados.atendimentoAnterior2;
    this.atendimentoAnterior1 = dados.atendimentoAnterior1;
    this.atendimentoAtual = dados.atendimentoAtual;

    this.atual =
      dados.atendimentoAtual.local + ' - ' + dados.atendimentoAtual.paciente;

    this.currentImageIndex = dados.currentImageIndex;
  }

  getNovasPublicidade() {
    this.http.get<any>(environment.url + '/painel/publicidade').subscribe(
      (result) => {
        this.images = result;
      },
      (error) => {
        console.log('Erro de comunicação.');
      }
    );
  }

  getPublicidade() {
    this.http.get<any>(environment.url + '/painel/publicidade').subscribe(
      (result) => {
        this.images = result;

        this.showNextImage();
        setInterval(() => {
          this.showNextImage();
        }, 30000); // Tempo em milissegundos entre cada imagem
      },
      (error) => {
        console.log('Erro de comunicação.');
      }
    );
  }

  showNextImage() {
    if (!this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.currentImage = this.images[this.currentImageIndex];
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  // Alterna entre exibir publicidade e vídeo
  switchBetweenAdAndVideo() {
    setInterval(() => {
      this.showVideo = !this.showVideo;
    }, 1800000); // Alterna a cada 30 minutos (1800000 ms)
  }

  onPost(id: string): Observable<any> {
    return this.socketService
      .onMessage(`/topic/posts/${id}/chamar`)
      .pipe(map((post) => this.atualizaAtendimentos(post)));
  }

  atualizaAtendimentos(atendimento: AtendimentoModel) {
    this.atendimentoAnterior5 = this.atendimentoAnterior4;
    this.atendimentoAnterior4 = this.atendimentoAnterior3;
    this.atendimentoAnterior3 = this.atendimentoAnterior2;
    this.atendimentoAnterior2 = this.atendimentoAnterior1;
    this.atendimentoAnterior1 = this.atendimentoAtual;

    this.atendimentoAtual = atendimento;

    this.atual = atendimento.local + ' - ' + atendimento.paciente;

    const audio = new Audio('../../../assets/audio/' + this.toque + '.mp3');

    audio.play();

    setTimeout(() => {
      concat(
        speak(this.atendimentoAtual.paciente || ''),
        speak(this.atendimentoAtual.local || '')
      ).subscribe();
    }, 2400);
  }
}

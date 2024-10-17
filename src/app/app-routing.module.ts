import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { UnidadeComponent } from './unidade/unidade.component';
import { SocketClientService } from './websocket/socket-client.service';

const routes: Routes = [
  { path: '', component: UnidadeComponent },
  { path: 'painel', component: PainelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SocketClientService]
})
export class AppRoutingModule { }

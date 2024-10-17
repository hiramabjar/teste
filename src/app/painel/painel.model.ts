import { AtendimentoModel } from './atendimento.model';
export interface PainelModel  {
    atendimentoAtual?: AtendimentoModel;
    ultimosAtendidos?: AtendimentoModel[];
}

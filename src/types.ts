export interface IFreteProps {
  nCdServico: ["04014"];
  sCepOrigem: string;
  sCepDestino: string;
  nVlPeso: string;
  nCdFormato: "1" | "2" | "3";
  nVlComprimento: string;
  nVlAltura: string;
  nVlLargura: string;
  nVlDiametro: string;
  nCdEmpresa?: string;
  sDsSenha?: string;
  sCdMaoPropria?: "S" | "N";
  nVlValorDeclarado?: string;
  sCdAvisoRecebimento?: "S" | "N";
}

export interface IResponse {
  Codigo: number;
  Valor: string;
  ValorMaoPropria: string;
  ValorAvisoRecebimento: string;
  ValorValorDeclarado: string;
  Erro: string;
  MsgErro: object;
}

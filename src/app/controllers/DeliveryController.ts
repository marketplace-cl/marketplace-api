import {
  calcularPrecoPrazo,
  consultarCep,
  rastrearEncomendas,
} from "correios-brasil";
import { Request, Response } from "express";

async function calculatePriceTime(req: Request, res: Response) {
  const { sCepDestino } = req.body;

  let args = {
    nCdServico: ["04014", "04510"],
    sCepOrigem: "98130-000",
    sCepDestino: sCepDestino,
    nVlPeso: "0.5",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "10",
    nVlLargura: "10",
    nVlDiametro: "0",
  };

  try {
    const response = await calcularPrecoPrazo(args);

    res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    console.log(error.message);
    res.json({ error: error.message, success: false });
  }
}

export default { calculatePriceTime };

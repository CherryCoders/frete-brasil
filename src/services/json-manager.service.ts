import * as cheerio from "cheerio";
import { ParserUtil } from "../utils/parser.util";
import { CorreiosAPI } from "../repository/types/correios.types";

export class JSONManager {
  constructor() {}

  public htmlToJSON(data: string): CorreiosAPI.Response {
    const $ = cheerio.load(data);

    const priceServiceHtml = $("body .comparaResult tbody tr").eq(3).text();
    const priceService = ParserUtil.toNumber(priceServiceHtml);
    const priceTotal = $("body .comparaResult tfoot tr td").text();
    const priceTotalService = ParserUtil.toNumber(priceTotal);

    const localeStringCurrency = (value: number) =>
      value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    return {
      service: {
        formatedPrice: localeStringCurrency(priceService),
        price: priceService,
      },
      total: {
        formatedPrice: localeStringCurrency(priceTotalService),
        price: priceTotalService,
      },
    };
  }
}

import * as cheerio from "cheerio";
import { ParserUtil } from "../utils/parser.util";
import { CorreiosAPI } from "../repository/types/correios.types";

export class JSONManager {
  constructor() {}

  public htmlToJSON(data: string): CorreiosAPI.Response {
    const $ = cheerio.load(data);

    const termDeliver = $("body .comparaResult tbody tr").eq(1).text();
    const terms = termDeliver.replace(/[^\d+$]/g, "").split("+");
    const postedAt = terms[0]?.replace(/(\d{2})(\d{2})(\d{4})/g, "$1/$2/$3");

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
      delivery: {
        postedAt,
        days: Number(isNaN(Number(terms[1])) ? 0 : terms[1]),
      },
    };
  }
}

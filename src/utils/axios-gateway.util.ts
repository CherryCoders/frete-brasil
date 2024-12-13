import axios from "axios";
import {
  BoxType,
  CORREIOS_URI,
  PackingType,
  ServicesType,
  USER_AGENT,
} from "../repository/constants/correios.constants";
import { CorreiosAPI } from "../repository/types/correios.types";
import { ValidatorsUtil } from "./validators.util";
import { FormManagerService } from "../services/form-manager.service";

export class AxiosGatewayUtil {
  public static request() {
    return axios.create({
      baseURL: CORREIOS_URI,
      headers: {
        "User-Agent": USER_AGENT,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  public static formDataTerm(input: CorreiosAPI.Input) {
    try {
      const currentDate: string = new Date().toLocaleDateString("pt-BR");

      const form = new FormManagerService();
      form.append("data", currentDate);

      form.append(
        "dataAtual",
        input?.currentDate?.toLocaleDateString("pt-BR") || currentDate
      );

      if (ValidatorsUtil.isCEP(input.cep.from)) {
        form.append("cepOrigem", input.cep.from);
      }

      if (ValidatorsUtil.isCEP(input.cep.to)) {
        form.append("cepDestino", input.cep.to);
      }

      if (!ServicesType[input.service])
        throw new Error("Service not is valid.");

      if (!BoxType?.[input.format]) throw new Error("Box type is not valid");
      if (!PackingType[input.packing])
        throw new Error("Pacing type is not valid");

      form.append("servico", ServicesType[input.service]);
      form.append("Selecao", input.selection || "caixa selected");
      form.append("Formato", BoxType?.[input.format]?.toString());
      form.append("embalagem1", PackingType[input.packing]);
      form.append("Altura", input?.box?.height?.toString() || "1");
      form.append("Largura", input?.box?.width?.toString() || "1");
      form.append("Comprimento", input?.box?.greeting?.toString() || "1");
      form.append("peso", input?.size?.toString() || "1");
      form.append("Calcular", "Calcular");

      return form;
    } catch (err) {
      console.log(err);
    }
  }
}

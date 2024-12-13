import { AxiosInstance } from "axios";
import { AxiosGatewayUtil } from "../utils/axios-gateway.util";
import { CorreiosAPI } from "../repository/types/correios.types";
import { JSONManager } from "./json-manager.service";
import { ServicesType } from "../repository/constants/correios.constants";
import NodeCache from "node-cache";
import { CacheManagerService } from "./cache-manager.service";

export class CorreiosGateway {
  private readonly request: AxiosInstance = AxiosGatewayUtil.request();
  private readonly JSONManager: JSONManager = new JSONManager();
  private readonly CacheManager: CacheManagerService = new CacheManagerService(
    new NodeCache({
      stdTTL: 60e3,
      deleteOnExpire: true,
    })
  );

  constructor(public readonly isCache?: boolean) {}

  async getCalcTerm(input: CorreiosAPI.Input): Promise<CorreiosAPI.Response> {
    if (this.isCache) {
      const cache = this.CacheManager.get(input.cep.to);
      if (cache) return cache;
    }

    const response = await this.request.post(
      "prazos.cfm",
      AxiosGatewayUtil.formDataTerm(input)
    );

    const responseJSON = this.JSONManager.htmlToJSON(
      response?.data || "<body></body>"
    );

    responseJSON.service.serviceName = input.service;
    responseJSON.service.code = Number(ServicesType[input.service]) || 0;

    if (this.isCache) this.CacheManager.populate(input.cep.to, responseJSON);

    return responseJSON;
  }
}

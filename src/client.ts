import { CorreiosAPI } from "./repository/types/correios.types";
import { CorreiosGateway } from "./services/correios-gateway.service";

export class ClientCorreios {
  public gateway: CorreiosGateway;

  constructor(options: CorreiosAPI.Configuration) {
    this.gateway = new CorreiosGateway(options?.cache || false);
  }
}

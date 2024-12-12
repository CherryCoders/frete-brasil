import { BoxType, ServicesType } from "../constants/correios.constants";

export namespace CorreiosAPI {
  export type Response = {};

  export type Input = {
    currentDate?: Date;
    service: keyof typeof ServicesType;
    cep: {
      from: "";
      to: "";
    };
    selection?: string;
    format: keyof typeof BoxType;
    packing: string;
  };
}

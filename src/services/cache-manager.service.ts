import NodeCache from "node-cache";
import { CorreiosAPI } from "../repository/types/correios.types";

export class CacheManagerService {
  constructor(public readonly cache: NodeCache) {}

  populate(
    key: string,
    data: CorreiosAPI.Response
  ): CorreiosAPI.Response | undefined {
    const isExists: CorreiosAPI.Response | undefined =
      this.cache.get<CorreiosAPI.Response>(key);
    if (isExists) return isExists;

    this.cache.set(key, data);

    return data;
  }

  get(key: string): CorreiosAPI.Response | undefined {
    return this.cache.get<CorreiosAPI.Response>(key);
  }
}

export class ParserUtil {
  public static toNumber(value: string): number {
    if (!value) return 0;
    return Number(value.replace(/[^\d,]/g, "").replace(",", "."));
  }
}

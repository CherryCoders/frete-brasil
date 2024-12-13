export class ValidatorsUtil {
  public static isCEP(cep: string): boolean {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    if (!cepRegex.test(cep)) throw new Error("CEP is not valid");

    return cepRegex.test(cep);
  }
}

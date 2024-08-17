export class StringHelper {

  public static GenerateString(n: number): string {
    let number: string = "";
    for (let i = 0; i < n; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  };
};

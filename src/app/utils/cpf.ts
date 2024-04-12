import { FormControl } from "@angular/forms";

export class CpfUtil {
  static validateCpf(control: FormControl): { [key: string]: any } | null {
    const cpfPattern = /^[0-9]*$/;

    if (control.value && !cpfPattern.test(control.value)) {
      return { invalidCpf: true };
    }

    return null;
  }
}

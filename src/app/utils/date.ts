import { FormControl } from '@angular/forms';

export class DateUtil {
  static stringToDate(dateString: string): Date | null {
    // Verifica se a string está no formato esperado
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(dateString)) {
      console.error('A string não está no formato esperado (dd/mm/aaaa).');
      return null;
    }

    // Divide a string em partes (dia, mês, ano)
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Cria um objeto Date com os componentes
    const date = new Date(year, month - 1, day);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      console.error('A data fornecida não é válida.');
      return null;
    }

    return date;
  }

  static formatDateSend(date: Date) {
    const formattedDate = [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2),
    ].join('-');
    return formattedDate;
  }

  static validateDateFormat(
    control: FormControl
  ): { [key: string]: any } | null {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (control.value) {
      // Verifica se a data está no formato correto
      if (!datePattern.test(control.value)) {
        return { invalidDateFormat: { value: control.value } };
      }

      // Extrai os componentes da data
      const parts = control.value.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Verifica se a data é válida
      if (day < 1 || day > 31 || month < 1 || month > 12) {
        return { invalidDate: { value: control.value } };
      }

      // Verifica se o mês tem 30 dias
      if (
        day === 31 &&
        (month === 4 || month === 6 || month === 9 || month === 11)
      ) {
        return { invalidDate: { value: control.value } };
      }

      // Verifica se fevereiro tem mais de 29 dias
      if (month === 2 && day > 29) {
        return { invalidDate: { value: control.value } };
      }

      // Verifica se fevereiro tem 29 dias em anos bissextos
      if (
        month === 2 &&
        day === 29 &&
        (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0))
      ) {
        return { invalidDate: { value: control.value } };
      }
    }

    return null;
  }

  static validateDateTodayOrFuture(
    control: FormControl
  ): { [key: string]: any } | null {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (control.value) {
      // Verifica se a data está no formato correto
      if (!datePattern.test(control.value)) {
        return { invalidDateFormat: { value: control.value } };
      }

      // Extrai os componentes da data
      const parts = control.value.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Subtrai 1 do mês, pois os meses em JavaScript começam em zero
      const year = parseInt(parts[2], 10);

      // Cria um objeto Date para a data atual
      const today = new Date();

      // Cria um objeto Date para a data fornecida
      const inputDate = new Date(year, month, day);

      // Zerando o time
      today.setHours(0, 0, 0, 0);

      // Compara as datas
      if (inputDate < today) {
        return { invalidFutureDate: { value: control.value } };
      }
    }

    return null;
  }

  static validateDateFuture(
    control: FormControl
  ): { [key: string]: any } | null {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (control.value) {
      // Verifica se a data está no formato correto
      if (!datePattern.test(control.value)) {
        return { invalidDateFormat: { value: control.value } };
      }

      // Extrai os componentes da data
      const parts = control.value.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Subtrai 1 do mês, pois os meses em JavaScript começam em zero
      const year = parseInt(parts[2], 10);

      // Cria um objeto Date para a data atual
      const today = new Date();

      // Cria um objeto Date para a data fornecida
      const inputDate = new Date(year, month, day);

      // Compara as datas
      if (inputDate < today) {
        return { invalidFutureDate: { value: control.value } };
      }
    }

    return null;
  }
}

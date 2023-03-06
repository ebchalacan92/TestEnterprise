export const returnDateInput = (value) => {
    const valueNotFormated = new Date(value);
    let dateString = valueNotFormated.getFullYear() + '-';
    if (valueNotFormated.getMonth() < 9) {
      dateString += '0';
    }
    dateString += (valueNotFormated.getMonth() + 1);
    dateString += '-';
    if (valueNotFormated.getDate() < 10) {
      dateString += '0';
    }
    dateString += valueNotFormated.getDate();
    return dateString;
  }
  
  export const returnTimestamp = (value) => {
    const valueNotFormated = new Date(value);
    return new Date(valueNotFormated.getFullYear(), valueNotFormated.getMonth(),
    valueNotFormated.getDate() + 1).getTime();
  }
  
  export const returnDateString = (value) => {
    return new Date(value).toLocaleDateString('en-US');
  }
  
  export const returnDateAll = (fecha: Date, patron: string) => {
    let resultado: string = "";
    let yyyy = fecha.getFullYear().toString();
    let mm: number = (fecha.getMonth() + 1);
    let mes: string = "";
    if (mm >= 1 && mm <= 9) {
      mes = "0" + mm.toString();
    }
    else {
      mes = mm.toString();
    }

    let dd = fecha.getDate();
    let dia: string = "";
    if (dd >= 1 && dd <= 9) {
      dia = "0" + dd.toString();
    }
    else {
      dia = dd.toString();
    }
    if (patron == '') {
      resultado = yyyy + mes + dia;
    }
    else {
      resultado = yyyy + patron + mes + patron + dia;
    }

    return resultado;
  }

  export const convertirFechaBuscarHora = (fecha: Date, patron: string) => {
    let resultado: string = "";
    let yyyy = fecha.getFullYear().toString();
    let mm: number = (fecha.getMonth() + 1);
    let mes: string = "";
    if (mm >= 1 && mm <= 9) {
      mes = "0" + mm.toString();
    }
    else {
      mes = mm.toString();
    }

    let dd = fecha.getDate();
    const hh = fecha.toLocaleTimeString();
    let dia: string = "";
    if (dd >= 1 && dd <= 9) {
      dia = "0" + dd.toString();
    }
    else {
      dia = dd.toString();
    }
    if (patron == '') {
      resultado = yyyy + mes + dia + 'T' + hh;
    }
    else {
      resultado = yyyy + patron + mes + patron + dia + 'T' + hh;
    }

    return resultado;
  }
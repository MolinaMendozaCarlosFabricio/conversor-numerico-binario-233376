import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  entrada_binario: string = "";
  entrada_decimal: number = 0;
  entrada_hexadecimal: string = "";

  opciones: number = 0;

  convertir_binario(){
    let contador: number = 0;
    let j: number = 0;
    for(let i: number = this.entrada_binario.length - 1; i >= 0; i--){
      let number = parseInt(this.entrada_binario.charAt(i));
      if(isNaN(number) || (number !== 0 && number !== 1)){
        return;
      }
      contador += number * Math.pow(2, j);
      j++;
    }

    this.entrada_decimal = contador;

    this.entrada_hexadecimal = "";
    let agrupado: string = this.entrada_binario;

    while (agrupado.length % 4 !== 0) {
      agrupado = "0" + agrupado;
    }

    for (let i = agrupado.length; i > 0; i -= 4) {
      const grupo = agrupado.substring(i - 4, i);
      const decimal = parseInt(grupo, 2);

      if (decimal > 9) {
        this.entrada_hexadecimal = this.asignar_letra(decimal) + this.entrada_hexadecimal;
      } else {
        this.entrada_hexadecimal = decimal + this.entrada_hexadecimal;
      }
    }

  }

  asignar_letra(contador: number): string{
    let retorno: string = "";
    if (contador == 10)
      retorno = "A";
    if (contador == 11)
      retorno = "B";
    if (contador == 12)
      retorno = "C";
    if (contador == 13)
      retorno = "D";
    if (contador == 14)
      retorno = "E";
    if (contador == 15)
      retorno = "F";
    return retorno;
  }

  convertir_decimal(){
    this.entrada_binario = "";
    let aux: number = this.entrada_decimal;

    do {
      this.entrada_binario = (aux % 2) + this.entrada_binario;
      aux = Math.floor(aux / 2);
    } while (aux > 0);

    this.entrada_hexadecimal = "";
    aux = this.entrada_decimal;

    do {
      const resto = aux % 16;
      if (resto > 9) {
        this.entrada_hexadecimal = this.asignar_letra(resto) + this.entrada_hexadecimal;
      } else {
        this.entrada_hexadecimal = resto + this.entrada_hexadecimal;
      }
      aux = Math.floor(aux / 16);
    } while (aux > 0);
  }

  convertir_hexadecimal(){
    this.entrada_decimal = 0;
    const hex = this.entrada_hexadecimal.toUpperCase();

    for (let i = 0; i < hex.length; i++) {
      const char = hex.charAt(hex.length - 1 - i);
      const valor = parseInt(char, 16);

      if (isNaN(valor)) {
        console.error("La entrada no es un número hexadecimal válido.");
        return;
      }

      this.entrada_decimal += valor * Math.pow(16, i);
    }

    this.convertir_decimal();
  }
}

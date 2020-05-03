import { Injectable } from '@angular/core';
import { Prestamo } from '../models/prestamo';
import { PrestamoInput } from '../models/prestamoInput';

@Injectable({
    providedIn: 'root'
  })
export class HelperService {

    constructor() {

    }


    inputToPrestamo(prestamoInput: PrestamoInput): Prestamo {

        const prestamo: Prestamo = new Prestamo();

        prestamo.id = prestamoInput.id;
        prestamo.fechaIni = prestamoInput.fechaIni;
        prestamo.fechaFin = prestamoInput.fechaFin;
        prestamo.importe = this.insertarSimbolos(prestamoInput.importe, '€');
        prestamo.importeInicial = this.insertarSimbolos(prestamoInput.importeInicial, '€');
        prestamo.interes = this.insertarSimbolos(prestamoInput.interes, '%');
        prestamo.cliente = prestamoInput.cliente;
        prestamo.intermediario = prestamoInput.intermediario;
        prestamo.estado = prestamoInput.estado;

        return prestamo;

    }

    prestamoToInput(prestamo: Prestamo): PrestamoInput {

        const prestamoInput: PrestamoInput = new PrestamoInput();

        prestamoInput.id = prestamo.id;
        prestamoInput.cliente = prestamo.cliente;
        prestamoInput.estado = prestamo.estado;
        prestamoInput.fechaFin = prestamo.fechaFin;
        prestamoInput.fechaIni = prestamo.fechaIni;
        prestamoInput.importe = this.eliminarSimbolos(prestamo.importe);
        prestamoInput.importeInicial = this.eliminarSimbolos(prestamo.importeInicial);
        prestamoInput.interes = this.eliminarSimbolos(prestamo.interes);
        prestamoInput.intermediario = prestamo.intermediario;

        return prestamoInput;

    }


    public eliminarSimbolos(dataIn: string): string {

        let result = dataIn.slice(0 , -2);

        result = result.replace('.' , '');
        //result = result.replace(',' , '');

        return result;

    }

    public insertarSimbolos(dataIn: string, simbolo: string): string {

        let result = dataIn.replace('.', ',');
        result += ' ' + simbolo;

        return result;
    }
}

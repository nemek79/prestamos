import { Cliente } from './cliente';
import { Intermediario } from './intermediario';
import { Prestamo } from './prestamo';
import { EstadoPrestamo } from './estadoprestamo';

export class PrestamoInput {

    id: string;
    fechaIni: string;
    fechaFin: string;
    importe: string;
    importeInicial: string;
    interes: string;
    cliente: Cliente;
    intermediario: Intermediario;
    estado: EstadoPrestamo;

}

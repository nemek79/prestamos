import { EstadoMensualidad } from './EstadoMensualidad';
import { Intermediario } from './intermediario';
import { Cliente } from './cliente';
import { EstadoPrestamo } from './estadoprestamo';

export class Prestamo {

  id: string;
  fechaIni: string;
  fechaFin: string;
  importe: string;
  importeInicial: string;
  interes: string;
  cliente: Cliente;
  intermediario: Intermediario;
  estado: EstadoPrestamo;
  mensualidad: string;
  estadoMensualidad: EstadoMensualidad;

}

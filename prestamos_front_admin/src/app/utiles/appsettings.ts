import { Options } from 'autonumeric';

export class AppSettings {

    public static AUTONUMERIC_IMPORTES: Options = {
        currencySymbol: ' €',
        digitGroupSeparator: '.',
        decimalCharacter: ',',
        decimalPlaces: 2,
        maximumValue: '9999.99',
        currencySymbolPlacement: 's'
    };

    public static AUTONUMERIC_PORCENTAJE: Options = {
        currencySymbol: ' %',
        digitGroupSeparator: '.',
        decimalCharacter: ',',
        decimalPlaces: 2,
        maximumValue: '99.99',
        currencySymbolPlacement: 's'
    };

    public static AUTONUMERIC_DIA_MES: Options = {
        currencySymbol: '',
        digitGroupSeparator: '.',
        decimalCharacter: ',',
        decimalPlaces: 0,
        maximumValue: '30',
        minimumValue: '1'
    };

    // ===========================
    // DATATABLES
    // ===========================

    public static TABLE_LANG_ES = {
        processing:     'cargando...',
        search:         'Buscar',
        lengthMenu:    'Mostrar _MENU_ registros',
        info:           'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty:      'Mostrando 0 a 0 de 0 registros',
        infoFiltered:   '(filtrado de _MAX_ elementos en total)',
        infoPostFix:    '',
        loadingRecords: 'Cargando datos...',
        zeroRecords:    'No se han encontrado datos.',
        emptyTable:     'No se han encontrado datos',
        paginate: {
            first:      'Primer',
            previous:   'Anterior',
            next:       'Siguiente',
            last:       'Último'
        },
        aria: {
            sortAscending:  '',
            sortDescending: ''
        }
      };

}
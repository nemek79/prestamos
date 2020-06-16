package es.vir2al.prestamos.dtos;

import java.io.Serializable;

public class MensualidadByMonthsDTO implements Serializable {

    private static final long serialVersionUID = -644328085745121964L;

    private Integer mes;
    private Float intereses;

    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Float getIntereses() {
        return intereses;
    }

    public void setIntereses(Float intereses) {
        this.intereses = intereses;
    }

    public MensualidadByMonthsDTO(Integer mes, Double intereses) {
        this.mes = mes;
        this.intereses = intereses.floatValue();
    }
    
}
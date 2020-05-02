package es.vir2al.prestamos.data.responses;

import java.io.Serializable;
import java.util.List;

public class ErrorResponse implements Serializable{

    private static final long serialVersionUID = 3762522032392279643L;

    List<String> errors;
    String code;

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
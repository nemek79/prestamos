package es.vir2al.prestamos.data.responses;

import java.io.Serializable;

/**
 * DataResponse
 */
public class DataResponse<T> implements Serializable{

    private static final long serialVersionUID = 1L;

    private T data;
    private String info;

    public DataResponse() {
        this.data = null;
        this.info = null;
    }

    public DataResponse(T data, String info) {
        this.data = data;
        this.info = info;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
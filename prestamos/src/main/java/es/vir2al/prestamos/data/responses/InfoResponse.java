package es.vir2al.prestamos.data.responses;

import java.io.Serializable;

public class InfoResponse implements Serializable {

	private static final long serialVersionUID = -4128907010324965761L;

	private Integer total;
	private Integer index;
	private Integer offset;
	private Iterable<?> data;
	
	public InfoResponse() {

		this.total = 0;
		this.index = 0;
		this.offset = 0;
		this.data = null;
		
	}

	public InfoResponse(Integer total, Integer index, Integer offset, Iterable<Object> data) {

		this.total = total;
		this.index = index;
		this.offset = offset;
		this.data = data;

	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	public Iterable<?> getData() {
		return data;
	}

	public void setData(Iterable<?> data) {
		this.data = data;
	}

}

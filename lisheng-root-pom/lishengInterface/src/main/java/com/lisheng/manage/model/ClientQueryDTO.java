package com.lisheng.manage.model;

import java.util.Date;

public class ClientQueryDTO {

	private Integer clientId;
	
	private String clientName;
	
	private String phoneNum;
	
	private Integer status;
	
	private Integer pageNum = 1;
	
	private Integer pageSize = 20;
	
	private Integer startRow;
	
	

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getStartRow() {
		return startRow;
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}
	
	public String toString() {
		return "ClientQueryDTO [clientName=" + clientName + ", phoneNum="
				+ phoneNum + ", status=" + status + ", pageNum=" + pageNum
				+ ", pageSize=" + pageSize + ", startRow=" + startRow + "]";
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}
	
	
}

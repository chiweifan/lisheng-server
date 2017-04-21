package com.lisheng.manage.model;

import java.util.Date;

public class ClientVO {
	
	private Integer clientId;
	
	private String clientName;
	
	private String phoneNum;
	
	private Integer status;
	
	private Date createTime;

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return "ClientVO [clientId=" + clientId + ", clientName=" + clientName
				+ ", phoneNum=" + phoneNum + ", status=" + status
				+ ", createTime=" + createTime + "]";
	}
	
}

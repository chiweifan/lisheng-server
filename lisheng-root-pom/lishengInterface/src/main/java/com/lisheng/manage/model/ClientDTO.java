package com.lisheng.manage.model;

import java.math.BigDecimal;
import java.util.Date;

public class ClientDTO {
	
	private Integer clientId;
	
	private String clientName;
	
	private String phoneNum;
	
	private Integer status;
	
	private Date createTime;	
	
	private String statusName;
	
	public String getStatusName() {
		if(null != status) {
			if(status == 1) {
				return "合作";
			} else if(status ==2){
				return "不合作";
			} else {
				return null;
			}
		}else {
			return null;
		}
	}
	
	private Integer orderCount;
	
	private BigDecimal orderAmountByMonth;

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

	public Integer getOrderCount() {
		return orderCount;
	}

	public void setOrderCount(Integer orderCount) {
		this.orderCount = orderCount;
	}

	public BigDecimal getOrderAmountByMonth() {
		return orderAmountByMonth;
	}

	public void setOrderAmountByMonth(BigDecimal orderAmountByMonth) {
		this.orderAmountByMonth = orderAmountByMonth;
	}
	
}

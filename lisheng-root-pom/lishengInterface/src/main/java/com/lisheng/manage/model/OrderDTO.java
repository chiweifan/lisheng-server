package com.lisheng.manage.model;

import java.math.BigDecimal;
import java.util.Date;

public class OrderDTO {
	
	private Integer orderId;
	
	private Integer clientId;
	
	private Date startTime;
	
	private Date endTime;
	
	private String unitName;
	
	private Integer count;
	
	private String spec;
	
	private BigDecimal unitPrice;
	
	private BigDecimal sum;
	
	private Integer status;
	
	private String statusName;
	
	public String getStatusName() {
		
		if(null != status) {
			if(status == 1) {
				return "进行中";
			} else if(status ==2 ) {
				return "已发货";
			} else if (status == 3) {
				return "作废";
			} else {
				return "";
			}
		} else {
			return "";
		}
		
	}
	
	private Date createTime;
	
	private String clientName;

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public BigDecimal getSum() {
		return sum;
	}

	public void setSum(BigDecimal sum) {
		this.sum = sum;
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

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
}

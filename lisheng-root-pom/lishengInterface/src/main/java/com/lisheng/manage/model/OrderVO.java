package com.lisheng.manage.model;

import java.math.BigDecimal;
import java.util.Date;

public class OrderVO {
	
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
	
	private Date createTime;

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

	@Override
	public String toString() {
		return "OrderVO [orderId=" + orderId + ", clientId=" + clientId
				+ ", startTime=" + startTime + ", endTime=" + endTime
				+ ", unitName=" + unitName + ", count=" + count + ", spec="
				+ spec + ", unitPrice=" + unitPrice + ", sum=" + sum
				+ ", status=" + status + ", createTime=" + createTime + "]";
	}
	
}

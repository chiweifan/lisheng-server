package com.lisheng.manage.model;

import java.util.Date;

public class UnitVO {
	
	private Integer unitId;
	
	private String unitName;
	
	private Integer status;
	
	private Date createTime;

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
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
		return "UnitVO [unitId=" + unitId + ", unitName=" + unitName
				+ ", status=" + status + ", createTime=" + createTime + "]";
	}
	
}

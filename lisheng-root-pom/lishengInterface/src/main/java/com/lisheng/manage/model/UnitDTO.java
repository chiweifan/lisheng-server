package com.lisheng.manage.model;

import java.util.Date;

public class UnitDTO {

	private Integer unitId;
	
	private String unitName;
	
	private Integer status;
	
	private Date createTime;
	
	private String statusName;
	
	public String getStatusName() {
		if ( null != status) {
			if(status == 1) {
				return "启用";
			} else if(status == 2) {
				return "禁用";
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

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
	
}

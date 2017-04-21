package com.lisheng.manage.service;

import java.util.List;

import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.UnitDTO;
import com.lisheng.manage.model.UnitVO;

public interface UnitManageService {

	/**
	 * 添加货品单位
	 * @param unitVO
	 * @return
	 */
	public Response<Object> saveUnit(UnitVO unitVO);
	
	/**
	 * 修改货品单位状态
	 * @param unitId
	 * @param status
	 * @return
	 */
	public Response<Object> updateUnitStatus(Integer unitId, Integer status);
	
	/**
	 * 查询货品单位列表
	 * @param status
	 * @return
	 */
	public Response<List<UnitDTO>> queryUnitsList(Integer unitId , Integer status);

}

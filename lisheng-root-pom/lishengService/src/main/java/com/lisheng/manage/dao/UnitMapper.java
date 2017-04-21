package com.lisheng.manage.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lisheng.manage.model.UnitDTO;
import com.lisheng.manage.model.UnitVO;

public interface UnitMapper {
	
	/**
	 * 添加货品单位
	 * @param unitVO
	 * @return
	 */
	public Integer saveUnit(UnitVO unitVO);
	
	/**
	 * 修改货品状态
	 * @param unitId
	 * @param status
	 * @return
	 */
	public Integer updateUnitStatus(@Param("unitId")Integer unitId, @Param("status")Integer status);
	
	/**
	 * 查询货品单位列表
	 * @param status
	 * @return
	 */
	public List<UnitDTO> queryUnitsList(@Param("unitId")Integer unitId , @Param("status")Integer status);
	
	/**
	 * 编辑单位
	 * @param unitVO
	 */
	public Integer updateUnit(UnitVO unitVO);

}

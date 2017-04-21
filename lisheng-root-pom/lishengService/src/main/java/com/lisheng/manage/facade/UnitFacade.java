package com.lisheng.manage.facade;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.UnitDTO;
import com.lisheng.manage.model.UnitVO;
import com.lisheng.manage.service.UnitManageService;
import com.lisheng.manage.service.UnitService;

@Service
public class UnitFacade implements UnitService{
	
	@Autowired
	private UnitManageService unitManageService;
	
	private static final Logger log = LoggerFactory.getLogger(UnitFacade.class);
	
	/**
	 * 添加货品单位 
	 */
	public Response<Object> saveUnit(UnitVO unitVO) {
		log.debug("saveUnit , unitVO = {}" , unitVO.toString());
		
		
		return unitManageService.saveUnit(unitVO);
	}
	
	/**
	 * 修改货品状态
	 */
	public Response<Object> updateUnitStatus(Integer unitId, Integer status) {
		log.debug("updateUnitStatus , unitId = {} , status = {}" , unitId , status);
		
		
		return unitManageService.updateUnitStatus(unitId , status);
	}
	
	
	/**
	 * 查询货品单位列表
	 */
	public Response<List<UnitDTO>> queryUnitsList(Integer unitId , Integer status) {
		log.debug("queryUnitsList  status = {}" , unitId);
		
		return unitManageService.queryUnitsList( unitId , status);
	}
	
	
	
	
	
	
	
	
	
	
	
	
}

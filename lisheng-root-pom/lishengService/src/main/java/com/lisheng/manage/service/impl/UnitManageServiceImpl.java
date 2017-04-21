package com.lisheng.manage.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.dao.UnitMapper;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.model.UnitDTO;
import com.lisheng.manage.model.UnitVO;
import com.lisheng.manage.service.UnitManageService;

@Service
public class UnitManageServiceImpl implements UnitManageService {
	
	@Autowired
	private UnitMapper unitMapper;
	
	private static final Logger log = LoggerFactory.getLogger(UnitManageServiceImpl.class);
	
	
	/**
	 * 添加货品单位
	 */
	public Response<Object> saveUnit(UnitVO unitVO) {
		
		log.debug("saveUnit , unitVO = {}" , unitVO.toString());
		
		Response<Object> response = new Response<Object>();
		Integer count = 0;
		
		if(unitVO.getUnitId() == null || unitVO.getUnitId() < 1) {
			count = unitMapper.saveUnit(unitVO);
		} else {
			count = unitMapper.updateUnit(unitVO);
		}
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
			return response;
		}
		
		response.setStatus(ResponseStatus.SERVICE_ERROR);
		return response;
	}

	
	/**
	 * 修改货品状态
	 */
	public Response<Object> updateUnitStatus(Integer unitId, Integer status) {
		
		log.debug("updateUnitStatus , unitId = {} , status = {}" , unitId , status);
		
		Response<Object> response = new Response<Object>();
		
		Integer count = unitMapper.updateUnitStatus(unitId , status);
		
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		return response;
	}

	
	/**
	 * 查询货品单位列表
	 */
	public Response<List<UnitDTO>> queryUnitsList(Integer unitId , Integer status) {
		log.debug("queryUnitsList , status = {}" , unitId);
		
		Response<List<UnitDTO>> response = new Response<List<UnitDTO>>();
		
		List<UnitDTO> data = unitMapper.queryUnitsList(unitId , status);
		
		if(null != data) {
			response.setData(data);
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		return response;
	}
	
	
	
	
	
	
	
	
	
	
}

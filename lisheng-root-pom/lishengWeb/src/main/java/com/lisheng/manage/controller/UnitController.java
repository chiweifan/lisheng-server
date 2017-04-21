package com.lisheng.manage.controller;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParser;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.model.UnitDTO;
import com.lisheng.manage.model.UnitVO;
import com.lisheng.manage.service.UnitService;

@Controller
@RequestMapping("unit")
public class UnitController {

	@Autowired
	private UnitService unitService;
	
	private static final Logger log = LoggerFactory.getLogger(UnitController.class);
	
	@RequestMapping("saveUnit")
	@ResponseBody
	public Response<Object> saveUnit( UnitVO unitVO ) {
		if(log.isDebugEnabled()) {
			log.debug("saveUnit , unitVO = {}" , unitVO.toString() );
		}
		
		Response<Object> response  = new Response<Object>();
		
		try {
			if(null != unitVO) {
				if(StringUtils.isNotBlank(unitVO.getUnitName())) {
					unitVO.setCreateTime(new Date());
					unitVO.setStatus(1);
					response = unitService.saveUnit(unitVO);
					return response;
				}
				response.setStatus(ResponseStatus.PARAMETER_ERROR);
				return response;
			}
			response.setStatus(ResponseStatus.PARAMETER_ERROR);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(ResponseStatus.PARAMETER_ERROR);
			return response;
		}
	}
	
	
	
	@RequestMapping("updateUnitStatus")
	@ResponseBody
	public Response<Object> updateUnitStatus(Integer unitId , Integer status) {
		log.debug("updateUnitStatus , unitId = {} , status = {}" , unitId , status);
		
		Response<Object> response = new Response<Object>();
		
		try {
			if( null != unitId && unitId > 0 && null != status && status > 0 ) {
				response = unitService.updateUnitStatus(unitId , status);
				return response;
			} else {
				response.setStatus(ResponseStatus.PARAMETER_ERROR);
				return response;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(ResponseStatus.SERVICE_ERROR);
			return response;
		}
	}
	
	
	
	@RequestMapping("queryUnitsList")
	@ResponseBody
	public Response<List<UnitDTO>> queryUnitsList(Integer unitId , Integer status) {
		
		log.debug("queryUnitsList , status = {}" , unitId);
		Response<List<UnitDTO>> response = new Response<List<UnitDTO>>();
		try {
			response = unitService.queryUnitsList(unitId , status);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(ResponseStatus.SERVICE_ERROR);
			return response;
		}
	}
	
	
	
	
}

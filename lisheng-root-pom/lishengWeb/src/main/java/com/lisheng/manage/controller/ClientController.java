package com.lisheng.manage.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.FastArrayList;
import org.apache.commons.lang.StringUtils;
import org.apache.taglibs.standard.lang.jstl.NullLiteral;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lisheng.manage.model.ClientDTO;
import com.lisheng.manage.model.ClientQueryDTO;
import com.lisheng.manage.model.ClientVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.service.ClientService;
import com.lisheng.manage.util.FastJsonUtil;

@Controller
@RequestMapping("client")
public class ClientController {

	@Autowired
	private ClientService clientService; 
	
	private static final Logger log = LoggerFactory.getLogger(ClientController.class);
	
	
	@RequestMapping("saveClient")
	@ResponseBody
	public Response<Object> saveClient(String data) {
		
		log.debug("saveClient , data = {}" , data);
		
		Response<Object> response = new Response<Object>();
		
		List<ClientVO> clientList = new ArrayList<ClientVO>();
		
		if(StringUtils.isNotBlank(data)) {
			clientList = FastJsonUtil.jsonToArrayObject(ClientVO.class, data);
		} else {
			response.setStatus(ResponseStatus.PARAMETER_ERROR);
			return response;
		}
		
		try {
			if( null != clientList && !clientList.isEmpty()) {
				for(ClientVO vo : clientList) {
					clientService.saveClient(vo);
				}
				response.setStatus(ResponseStatus.SUCCESS);
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
	
	
	@RequestMapping("updateClientStatus")
	@ResponseBody
	public Response<Object> updateClientStatus(Integer clientId , Integer status) {
		
		log.debug("updateClientStatus , clientId  = {} , status = {}" , clientId , status);
		
		Response<Object> response = new Response<Object>();
		
		try {
			if( null != clientId && clientId > 0 && null != status && status > 0) {
				response = clientService.updateClientStatus(clientId , status);
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
	
	
	
	
	@RequestMapping("queryClientList")
	@ResponseBody
	public Response<List<ClientDTO>> queryClientList(ClientQueryDTO queryDTO) {
		
		log.debug("queryClientList , queryDTO  = {}" , queryDTO.toString());
		
		Response<List<ClientDTO>> response = new Response<List<ClientDTO>>();
		
		try {
			if(null != queryDTO) {
				if( null == queryDTO.getPageSize() || queryDTO.getPageSize() < 1) {
					queryDTO.setPageSize(20);
				}
				
				if(null == queryDTO.getPageNum() || queryDTO.getPageNum() < 1) {
					queryDTO.setPageNum(1);
				}
				
				response = clientService.queryClientList(queryDTO);
				response.setStatus(ResponseStatus.SUCCESS);
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
	
	
	@RequestMapping("updateClient")
	@ResponseBody
	public Response<Object> updateClient(Integer clientId , String clientName , String phoneNum) {
		log.debug("updateClient , clientId = {} , clientName = {} , phoneNum = {}" , clientId,clientName , phoneNum);
		
		Response<Object> response = new Response<Object>();
		
		if(null == clientId || clientId < 1 ) {
			response.setStatus(ResponseStatus.PARAMETER_ERROR);
			return response;
		}
		
		try {
			response = clientService.updateClient(clientId , clientName , phoneNum);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(ResponseStatus.PARAMETER_ERROR);
			return response;
		}
		
	}
	
	
	
	
	
	
}

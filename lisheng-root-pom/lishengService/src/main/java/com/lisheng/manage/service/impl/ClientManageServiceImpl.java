package com.lisheng.manage.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.dao.ClientMapper;
import com.lisheng.manage.model.ClientDTO;
import com.lisheng.manage.model.ClientQueryDTO;
import com.lisheng.manage.model.ClientVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.service.ClientManageService;

@Service
public class ClientManageServiceImpl implements ClientManageService{
	
	private static final Logger log = LoggerFactory.getLogger(ClientManageServiceImpl.class);
	
	@Autowired
	private ClientMapper clientMapper;
	
	/**
	 * 添加客户信息
	 */
	public Response<Object> saveClient(ClientVO clientVO) {
		log.debug("saveClient , clientVO = {}" , clientVO.toString());
		
		Response<Object> response = new Response<Object>();
		
		clientVO.setStatus(1);
		clientVO.setCreateTime(new Date());
		
		Integer count = clientMapper.saveClient(clientVO);
		
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		return response;
	}
	
	/**
	 * 修改客户状态
	 */
	public Response<Object> updateClientStatus(Integer clientId, Integer status) {
		
		log.debug("updateClientStatus , clientId  = {} , status = {}" , clientId , status);
		
		Response<Object> response = new Response<Object>();
		
		Integer count = clientMapper.updateClientStatus(clientId , status);
		
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		
		return response;
	}
	
	/**
	 * 多条件分页查询客户列表
	 */
	public Response<List<ClientDTO>> queryClientList(ClientQueryDTO queryDTO) {
		
		log.debug("queryClientList , queryDTO  = {}" , queryDTO.toString());
		
		Response<List<ClientDTO>> response = new Response<List<ClientDTO>>();
		queryDTO.setStartRow((queryDTO.getPageNum() - 1) * queryDTO.getPageSize());
		List<ClientDTO> data = clientMapper.queryClientList(queryDTO);
		
		for (ClientDTO clientDTO : data) {
			Integer orderCount = clientMapper.queryClientsOrderCount(clientDTO.getClientId());
			BigDecimal orderAmount = clientMapper.queryClientOrderAmount(clientDTO.getClientId());
			clientDTO.setOrderCount(orderCount);
			clientDTO.setOrderAmountByMonth(orderAmount);
		}
		
		Integer count = clientMapper.queryClientCount(queryDTO);
		response.setData(data);
		response.setCount(count);
		
		return response;
	}
	
	/**
	 * 编辑客户信息
	 */
	public Response<Object> updateClient(Integer clientId, String clientName,
			String phoneNum) {
		
		log.debug("updateClient , clientId = {} , clientName = {} , phoneNum = {}" , clientId,clientName , phoneNum);
		
		Response<Object> response = new Response<Object>();
		
		Integer count = clientMapper.updateClient(clientId , clientName , phoneNum);
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		
		return response;
	}
	
	
	
	
	
	
	
	
	
	
	
}

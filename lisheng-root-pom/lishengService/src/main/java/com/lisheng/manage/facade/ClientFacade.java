package com.lisheng.manage.facade;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.model.ClientDTO;
import com.lisheng.manage.model.ClientQueryDTO;
import com.lisheng.manage.model.ClientVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.service.ClientManageService;
import com.lisheng.manage.service.ClientService;

@Service
public class ClientFacade implements ClientService {
	
	@Autowired
	private ClientManageService clientManageService;
	
	private static final Logger log = LoggerFactory.getLogger(ClientFacade.class);

	
	/**
	 * 添加客户信息
	 */
	public Response<Object> saveClient(ClientVO clientVO) {
		log.debug("saveClient , clientVO = {}" , clientVO.toString());
		
		return clientManageService.saveClient(clientVO);
	}


	/**
	 * 修改客户状态
	 */
	public Response<Object> updateClientStatus(Integer clientId, Integer status) {
		log.debug("updateClientStatus , clientId  = {} , status = {}" , clientId , status);
		
		
		return clientManageService.updateClientStatus(clientId , status);
	}

	
	/**
	 * 多条件分页查询客户列表
	 */
	public Response<List<ClientDTO>> queryClientList(ClientQueryDTO queryDTO) {
		
		log.debug("queryClientList , queryDTO  = {}" , queryDTO.toString());
		return clientManageService.queryClientList(queryDTO);
	}

	
	/**
	 * 编辑客户信息
	 */
	public Response<Object> updateClient(Integer clientId, String clientName,
			String phoneNum) {
		log.debug("updateClient , clientId = {} , clientName = {} , phoneNum = {}" , clientId,clientName , phoneNum);
		return clientManageService.updateClient(clientId , clientName , phoneNum);
	}
	
	
	
	
	
	
	
	
	
	
	
}

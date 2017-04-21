package com.lisheng.manage.service;

import java.util.List;

import com.lisheng.manage.model.ClientDTO;
import com.lisheng.manage.model.ClientQueryDTO;
import com.lisheng.manage.model.ClientVO;
import com.lisheng.manage.model.Response;

public interface ClientManageService {

	/**
	 * 添加客户信息
	 * @param clientVO
	 * @return
	 */
	public Response<Object> saveClient(ClientVO clientVO);
	
	/**
	 * 修改客户状态
	 * @param clientId
	 * @param phoneNum
	 * @return
	 */
	public Response<Object> updateClientStatus(Integer clientId, Integer status);
	
	/**
	 * 多条件分页查询客户列表
	 * @param queryDTO
	 * @return
	 */
	public Response<List<ClientDTO>> queryClientList(ClientQueryDTO queryDTO);
	
	/**
	 * 编辑客户信息
	 * @param clienId
	 * @param clientName
	 * @param phoneNum
	 * @return
	 */
	public Response<Object> updateClient(Integer clientId, String clientName,
			String phoneNum);

}

package com.lisheng.manage.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lisheng.manage.model.ClientDTO;
import com.lisheng.manage.model.ClientQueryDTO;
import com.lisheng.manage.model.ClientVO;

public interface ClientMapper {

	/**
	 * 添加客户信息
	 * @param clientVO
	 * @return
	 */
	public Integer saveClient(ClientVO clientVO);
	
	/**
	 * 修改客户转台
	 * @param clientId
	 * @param phoneNum
	 * @return
	 */
	public Integer updateClientStatus(@Param("clientId")Integer clientId, @Param("status")Integer status);
	
	/**
	 * 多条件分页查询客户列表
	 * @param queryDTO
	 * @return
	 */
	public List<ClientDTO> queryClientList(ClientQueryDTO queryDTO);
	
	/**
	 * 查询客户当月订单数
	 * @param clientId
	 * @return
	 */
	public Integer queryClientsOrderCount(@Param("clientId")Integer clientId);
	
	/**
	 * 查询客户当月订单额
	 * @param clientId
	 * @return
	 */
	public BigDecimal queryClientOrderAmount(@Param("clientId")Integer clientId);
	
	/**
	 * 查询客户总数
	 * @param queryDTO
	 * @return
	 */
	public Integer queryClientCount(ClientQueryDTO queryDTO);
	
	/**
	 * 编辑客户信息
	 * @param clienId
	 * @param clientName
	 * @param phoneNum
	 * @return
	 */
	public Integer updateClient(@Param("clientId")Integer clientId, @Param("clientName")String clientName,
			@Param("phoneNum")String phoneNum);

}

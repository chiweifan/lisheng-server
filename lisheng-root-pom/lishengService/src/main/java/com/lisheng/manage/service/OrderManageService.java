package com.lisheng.manage.service;

import java.util.List;

import com.lisheng.manage.model.OrderDTO;
import com.lisheng.manage.model.OrderQueryDTO;
import com.lisheng.manage.model.OrderVO;
import com.lisheng.manage.model.Response;

public interface OrderManageService {

	/**
	 * 添加订单
	 * @param orderVO
	 * @return
	 */
	public Response<Object> saveOrder(OrderVO orderVO);
	
	/**
	 * 修改订单状态
	 * @param orderId
	 * @param status
	 * @return
	 */
	public Response<Object> updateOrderStatus(Integer orderId, Integer status);
	
	/**
	 * 获取订单列表
	 * @param queryDTO
	 * @return
	 */
	public Response<List<OrderDTO>> queryOrderList(OrderQueryDTO queryDTO);

}

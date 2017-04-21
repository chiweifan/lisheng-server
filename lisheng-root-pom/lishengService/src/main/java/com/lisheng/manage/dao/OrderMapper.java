package com.lisheng.manage.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lisheng.manage.model.OrderDTO;
import com.lisheng.manage.model.OrderQueryDTO;
import com.lisheng.manage.model.OrderVO;

public interface OrderMapper {

	/**
	 * 添加订单
	 * @param orderVO
	 * @return
	 */
	public Integer saveOrder(OrderVO orderVO);
	
	/**
	 * 修改订单状态
	 * @param orderId
	 * @param status
	 * @return
	 */
	public Integer updateOrderStatus(@Param("orderId")Integer orderId, @Param("status")Integer status);
	
	/**
	 * 获取订单列表
	 * @param queryDTO
	 * @return
	 */
	public List<OrderDTO> queryOrderList(OrderQueryDTO queryDTO);
	
	/**
	 * 获取订单数
	 * @param queryDTO
	 * @return
	 */
	public Integer queryOrderCount(OrderQueryDTO queryDTO);

}

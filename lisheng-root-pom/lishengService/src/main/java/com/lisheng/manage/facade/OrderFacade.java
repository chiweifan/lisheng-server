package com.lisheng.manage.facade;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.model.OrderDTO;
import com.lisheng.manage.model.OrderQueryDTO;
import com.lisheng.manage.model.OrderVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.service.OrderManageService;
import com.lisheng.manage.service.OrderService;

@Service
public class OrderFacade implements OrderService {
	
	private static final Logger log = LoggerFactory.getLogger(OrderFacade.class);
	
	@Autowired
	private OrderManageService orderManageServiceImpl;
	
	/**
	 * 添加订单
	 */
	public Response<Object> saveOrder(OrderVO orderVO) {
		log.debug("saveOrder , orderVO = {}"  ,  orderVO.toString());
		return orderManageServiceImpl.saveOrder(orderVO);
	}
	
	/**
	 * 修改订单状态
	 */
	public Response<Object> updateOrderStatus(Integer orderId, Integer status) {
		
		log.debug("updateOrderStatus , orderId = {} , status = {}" , orderId , status);
		
		return orderManageServiceImpl.updateOrderStatus(orderId , status);
	}

	public Response<List<OrderDTO>> queryOrderList(OrderQueryDTO queryDTO) {
		return orderManageServiceImpl.queryOrderList(queryDTO);
	}
	
	
	
	
	
	
	
	
	

}

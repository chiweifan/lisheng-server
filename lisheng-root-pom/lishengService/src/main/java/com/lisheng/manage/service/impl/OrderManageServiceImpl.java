package com.lisheng.manage.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lisheng.manage.dao.OrderMapper;
import com.lisheng.manage.model.OrderDTO;
import com.lisheng.manage.model.OrderQueryDTO;
import com.lisheng.manage.model.OrderVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.service.OrderManageService;

@Service
public class OrderManageServiceImpl implements OrderManageService{
	
	private static final Logger log = LoggerFactory.getLogger(OrderManageServiceImpl.class);
	
	@Autowired
	private OrderMapper orderMapper;
	
	
	/**
	 * 添加订单
	 */
	public Response<Object> saveOrder(OrderVO orderVO) {
		
		Response<Object> response = new Response<Object>();
		
		Integer count = orderMapper.saveOrder(orderVO);
		
		if(count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		
		return response;
	}

	
	/**
	 * 修改订单状态
	 */
	public Response<Object> updateOrderStatus(Integer orderId, Integer status) {
		
		log.debug("updateOrderStatus , orderId = {} , status = {}" , orderId , status);
		
		Response<Object> response = new Response<Object>();
		
		Integer count = orderMapper.updateOrderStatus(orderId , status);
		
		if( count == 1) {
			response.setStatus(ResponseStatus.SUCCESS);
		} else {
			response.setStatus(ResponseStatus.SERVICE_ERROR);
		}
		
		return response;
	}

	
	/**
	 * 获取订单列表
	 */
	public Response<List<OrderDTO>> queryOrderList(OrderQueryDTO queryDTO) {
		
		Response<List<OrderDTO>> response = new Response<List<OrderDTO>>();
		
		queryDTO.setStartRow((queryDTO.getPageNum() - 1) * queryDTO.getPageSize());
		
		List<OrderDTO> data = orderMapper.queryOrderList(queryDTO);
		
		Integer count = orderMapper.queryOrderCount(queryDTO);
		
		response.setData(data);
		response.setCount(count);
		return response;
	}
	
}

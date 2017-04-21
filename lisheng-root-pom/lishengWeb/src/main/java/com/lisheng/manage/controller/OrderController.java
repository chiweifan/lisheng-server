package com.lisheng.manage.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lisheng.manage.model.OrderDTO;
import com.lisheng.manage.model.OrderQueryDTO;
import com.lisheng.manage.model.OrderVO;
import com.lisheng.manage.model.Response;
import com.lisheng.manage.model.ResponseStatus;
import com.lisheng.manage.service.OrderService;

@Controller
@RequestMapping("order")
public class OrderController {
	
	private static final Logger log = LoggerFactory.getLogger(OrderController.class);
	
	@Autowired
	private OrderService orderService;
	
	
	@RequestMapping("saveOrder")
	@ResponseBody
	public Response<Object> saveOrder(OrderVO orderVO) {
		
		log.debug("saveOrder , orderVO = {}"  ,  orderVO.toString());
		
		Response<Object> response = new Response<Object>();
		
		try {
			if( null != orderVO ) {
				orderVO.setCreateTime(new Date());
				orderVO.setStatus(1);
				BigDecimal countDecimal = new BigDecimal(orderVO.getCount());
				orderVO.setSum(orderVO.getUnitPrice().multiply(countDecimal));
				response = orderService.saveOrder(orderVO);
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
	
	
	@RequestMapping("updateOrderStatus")
	@ResponseBody
	public Response<Object> updateOrderStatus(Integer orderId , Integer status) {
		
		log.debug("updateOrderStatus , orderId = {} , status = {}" , orderId , status);
		
		Response<Object> response = new Response<Object>();
		
		try {
			if(null != orderId && orderId > 0 && null != status && status > 0) {
				
				response = orderService.updateOrderStatus(orderId , status);
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
	
	@RequestMapping("queryOrderList")
	@ResponseBody
	public Response<List<OrderDTO>> queryOrderList(OrderQueryDTO queryDTO) {
		
		log.debug("queryOrderList , queryDTO = {}" , queryDTO.toString());
		
		Response<List<OrderDTO>> response = new Response<List<OrderDTO>>();
		
		try {
			if( null == queryDTO) {
				response.setStatus(ResponseStatus.PARAMETER_ERROR);
				return response;
			}
			
			response = orderService.queryOrderList(queryDTO);
			response.setStatus(ResponseStatus.SUCCESS);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(ResponseStatus.SERVICE_ERROR);
			return response;
		}
		
	}
	
	
}

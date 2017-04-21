/**
 * 
 */
package com.lisheng.manage.model;

import java.io.Serializable;


/**
 * @comment �?
 * @author  ：liaokucheng@ftown.com
 * @date    �?2016�?6�?29�? 
 */
public class Response<T> implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4887801454247482518L;

	private int ret;
	
	private String msg;
	
	private T data;
	/**
	 * 分页查询时，分页数据总数
	 */
	private Integer count;
	
	/**
	 * 服务异常
	 */
	public static Response<Object> SERVICE_EXCEPTION;
	/**
	 * 登录超时
	 */
	public static Response<Object> LOGIN_TIME_OUT;

	/**
	 * 传输异常
	 */

	public static Response<Object> PARAMETER_ERROR;
	
	static {
		SERVICE_EXCEPTION = new Response<Object>();
		SERVICE_EXCEPTION.setStatus(ResponseStatus.SERVICE_ERROR);
		LOGIN_TIME_OUT = new Response<Object>();
		LOGIN_TIME_OUT.setStatus(ResponseStatus.LOGIN_OUT);
		PARAMETER_ERROR = new Response<Object>();
		PARAMETER_ERROR.setStatus(ResponseStatus.PARAMETER_ERROR);
	}
	
	public boolean isSussess(){
		return ret==1;
	}
	
	public void setStatus(ResponseStatus status){
		this.ret=status.getCode();
		this.msg=status.getMessage();
	}
	
	public static Response<Object> build(ResponseStatus status){
		Response<Object> response = new Response<Object>();
		response.ret=status.getCode();
		response.msg=status.getMessage();
		return response;
	}

	/**
	 * @return the ret
	 */
	public int getRet() {
		return ret;
	}

	/**
	 * @param ret the ret to set
	 */
	public void setRet(int ret) {
		this.ret = ret;
	}


	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the data
	 */
	public T getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(T data) {
		this.data = data;
	}

	/**
	 * @return the count
	 */
	public Integer getCount() {
		return count;
	}

	/**
	 * @param count the count to set
	 */
	public void setCount(Integer count) {
		this.count = count;
	}


}

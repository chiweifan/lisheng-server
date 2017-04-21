/**
 * 
 */
package com.lisheng.manage.model;

import java.io.Serializable;

/**
 * @comment ：返回状态码
 * @author  ：liaokucheng@ftown.com
 * @date    �?2016�?6�?29�? 
 */
public class ResponseStatus implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5386885879706169161L;

	private int code;
	
	private String message;
	/**
	 * 登录超时
	 */
	public static ResponseStatus LOGIN_OUT=new ResponseStatus(-1,"登录超时");
	/**
	 * 执行成功
	 */
	public static ResponseStatus SUCCESS=new ResponseStatus(1,"SUCCESS");
	
	/**
	 * 参数错误
	 */
	public static ResponseStatus PARAMETER_ERROR=new ResponseStatus(400,"参数错误");
	
	/**
	 * 服务异常
	 */
	public static ResponseStatus SERVICE_ERROR=new ResponseStatus(2,"服务异常");
	

	
	public ResponseStatus(int code,String message){
		this.code=code;
		this.message=message;
	}

	/**
	 * @return the code
	 */
	public int getCode() {
		return code;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

}

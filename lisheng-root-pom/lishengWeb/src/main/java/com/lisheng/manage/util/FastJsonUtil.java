package com.lisheng.manage.util;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;


public final class FastJsonUtil {

	private static SerializerFeature[] serializerFeatures = new SerializerFeature[] {
			SerializerFeature.WriteDateUseDateFormat,
			SerializerFeature.DisableCircularReferenceDetect };

	/**
	 * 将对象转换万为字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static String objectToJson(Object obj) {
		if (null != obj) {
			return JSON.toJSONString(obj, serializerFeatures);
		}
		return null;
	}

	/**
	 * 将字符串转化为json数组
	 * 
	 * @param text
	 * @return
	 */
	public static JSONArray textToJSONArray(String text) {
		if (null != text && !text.trim().equals("")) {
			return JSON.parseArray(text);
		}
		return null;
	}

	/**
	 * 将字符串转化为json对象
	 * 
	 * @param text
	 * @return
	 */
	public static JSONObject textToJSONObject(String text) {
		if (null != text && !text.trim().equals("")) {
			return JSON.parseObject(text);
		}
		return null;
	}

	/**
	 * 将对象转换为jsonObject
	 * 
	 * @param obj
	 * @return
	 */
	public static JSONObject objectToJsonObject(Object obj) {
		if (null != obj) {
			return JSON.parseObject(objectToJson(obj));
		}
		return null;
	}

	/**
	 * 将json转换为java对象
	 * 
	 * @param t
	 * @param text
	 * @return
	 */
	public static <T> T jsonToObject(Class<T> t, String text) {
		if (null != t && null != text && !text.trim().equals("")) {
			return JSON.parseObject(text, t);
		}
		return null;
	}

	/**
	 * 将json转换为java数组对象
	 * 
	 * @param t
	 * @param text
	 * @return
	 */
	public static <T> List<T> jsonToArrayObject(Class<T> t, String text) {
		if (null != t && null != text && !text.trim().equals("")) {
			return JSONArray.parseArray(text, t);
		}
		return null;
	}
}

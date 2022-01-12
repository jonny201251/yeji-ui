import request from 'umi-request';
import { Modal } from 'antd';
import { history } from 'umi';
import * as utils from '../utils';

export function get(url, params) {
  if (!url) {
    Modal.error({ content: '缺少url', okText: '知道了' });
    return;
  }
  return request
    .get(url, { params: params })
    .then((res) => {
      if (res.msg === '用户未登录') {
        Modal.error({
          content: '登录过期',
          okText: '重新登录',
          onOk: () => history.push('/login'),
        });
      } else if (res.code === 200) {
        return res.data;
      } else {
        Modal.error({ content: res.msg || '操作失败', okText: '知道了' });
      }
    })
    .catch((err) => {
      Modal.error({ content: '网络错误', okText: '知道了' });
    });
}

export function post(url, values) {
  if (!url) {
    Modal.error({ content: '缺少url', okText: '知道了' });
    return;
  }
  return request
    .post(url, { data: values })
    .then((res) => {
      if (res.msg === '用户未登录') {
        Modal.error({
          content: '登录过期',
          okText: '重新登录',
          onOk: () => history.push('/login'),
        });
      } else if (res.code === 200) {
        return res.data;
      } else {
        Modal.error({ content: res.msg || '操作失败', okText: '知道了' });
      }
    })
    .catch((err) => {
      Modal.error({ content: '网络错误', okText: '知道了' });
    });
}

export async function proTableRequest(params, sorter, filter) {
  let url = params.listUrl;
  delete params.listUrl;
  const data = await get(url, params);
  if (data) {
    if (data.dataList) {
      return {
        success: true,
        data: data.dataList,
        total: data.total,
        page: data.totalPage,
      };
    } else {
      return { success: true, data: data, total: data.length, page: 1 };
    }
  }
}

export async function columnRequest(url, params) {
  const data = await get(url, params);
  if (data) {
    return data.map((item) => ({ label: item, value: item }));
  }
}

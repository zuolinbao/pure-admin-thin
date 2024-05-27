import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type GetVerifyIdResult = {
  uuid: string;
  code: string;
  message: string;
  data: number
}

export type VerifyAndLoginUserResult = {
  uuid: string;
  code: string;
  message: string;
  data: string
};

/** 登录 */
export const getLogin = (params?: object) => {
  return http.request<UserResult>("post", "/verifyAndLoginUser", { params });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 获取图形验证码1 */
export const getVerifyId = (data?: object) => {
  return http.request<GetVerifyIdResult>("get", "/verifyCode/getVerifyId", { data });
};

/** 获取图形验证码1 */
export const getVerifyCode = (params?: object) => {
  return http.request<Blob>("get", "/verifyCode/getVerifyCode", { params, responseType: 'blob' });
};



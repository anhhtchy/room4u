import * as Types from '../constants/ActionType';

export const getData = (data) => {
    return {
        type: Types.GET_DATA_HOMEPAGE,
        payload: data,
    }
}

export const getDataPhongTroSV = (data) => {
    return {
        type: Types.GET_DATA_PHONG_TRO_SV,
        payload: data,
    }
}

export const getDataChungCu = (data) => {
    return {
        type: Types.GET_DATA_CHUNG_CU,
        payload: data,
    }
}

export const getDataNhaNguyenCan = (data) => {
    return {
        type: Types.GET_DATA_NHA_NGUYEN_CAN,
        payload: data,
    }
}

export const getDataVanPhong = (data) => {
    return {
        type: Types.GET_DATA_VAN_PHONG,
        payload: data,
    }
}
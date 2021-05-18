import * as Types from '../constants/ActionType';
import axios from 'axios';

const initialState = {
    list: [],
    // listPhongTroSV: [],
    // listNhaNguyenCan: [],
    // listChungCu: [],
    // listVanPhong: [],
    searchResult: [],
};

const homepage = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_DATA_HOMEPAGE: {
            let newList = action.payload;
            return {
                ...state,
                list: newList,
            }
        }

        // case Types.GET_DATA_PHONG_TRO_SV: {
        //     let newList = action.payload;
        //     return {
        //         ...state,
        //         listPhongTroSV: newList,
        //     }
        // }

        // case Types.GET_DATA_CHUNG_CU: {
        //     let newList = action.payload;
        //     return {
        //         ...state,
        //         listChungCu: newList,
        //     }
        // }

        // case Types.GET_DATA_VAN_PHONG: {
        //     let newList = action.payload;
        //     return {
        //         ...state,
        //         listVanPhong: newList,
        //     }
        // }

        // case Types.GET_DATA_NHA_NGUYEN_CAN: {
        //     let newList = action.payload;
        //     return {
        //         ...state,
        //         listNhaNguyenCan: newList,
        //     }
        // }

        case Types.GET_SEARCH_RESULT: {
            let newList = action.payload;
            return {
                ...state,
                searchResult: newList,
            }
        }

        default:
            return state;
    }
}

export default homepage;
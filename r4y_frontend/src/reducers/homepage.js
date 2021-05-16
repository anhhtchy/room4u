import * as Types from '../constants/ActionType';
import axios from 'axios';

const initialState = {
    list: [],
    listPhongTroSV: [],
    listNhaNguyenCan: [],
    listChungCu: [],
    listVanPhong: [],
};

const homepage = (state = initialState, action) => {
    switch(action.type) {
        case Types.GET_DATA_HOMEPAGE: {
            let newList = [...state.list];
            (async () => {
                try {
                  const res = await axios.get("http://localhost:3001/home");
                  if (res.status == 200) {
                    console.log("res", res.data.posts);
                    newList = await res.data.posts;
                  } else {
                    console.log("res", res);
                  }
                } catch (err) {
                  console.log(err);
                }
              })();
            return {
                ...state,
                list: newList,
            }
        }

        case Types.GET_DATA_PHONG_TRO_SV: {
            let newList = action.payload;
            return {
                ...state,
                listPhongTroSV: newList,
            }
        }

        case Types.GET_DATA_CHUNG_CU: {
            let newList = action.payload;
            return {
                ...state,
                listChungCu: newList,
            }
        }

        case Types.GET_DATA_VAN_PHONG: {
            let newList = action.payload;
            return {
                ...state,
                listVanPhong: newList,
            }
        }

        case Types.GET_DATA_NHA_NGUYEN_CAN: {
            let newList = action.payload;
            return {
                ...state,
                listNhaNguyenCan: newList,
            }
        }

        default:
            return state;
    }
}

export default homepage;
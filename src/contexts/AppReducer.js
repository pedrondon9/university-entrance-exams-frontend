import React, { useContext, useState } from 'react'
import {
  DATA_APP_CONTEXT,
  DATA_APP_REGISTER_CONTEXT
} from './constantesVar'




const AppReducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {

        case DATA_APP_CONTEXT :
            return {
                ...state,
                dataApp:{
                    ...state.dataApp,
                    ...payload

                }
            }
        case DATA_APP_REGISTER_CONTEXT :
            return {
                ...state,
                dataAppRegister:{
                    ...state.dataAppRegister,
                    ...payload

                }
            }
        default:
            return state;
    }

}

export default AppReducer
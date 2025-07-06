import React, { useContext, useState } from 'react'
import {
    DATA_APP_CONTEXT
} from './constantesVar'


const AppReducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case DATA_APP_CONTEXT:
            console.log(payload)
            return {
                ...state,
                dataApp: {
                    ...state.dataApp,
                    ...payload

                }
            }
        default:
            return state;
    }

}

export default AppReducer
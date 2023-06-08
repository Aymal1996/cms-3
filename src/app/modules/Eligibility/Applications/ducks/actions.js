import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getCountryDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Country?limit_page_length=0`);
        dispatch({
            type: action_types.COUNTRY,
            data: data,
        });
    };
};
export const getNationalityDrop = () => {
    return async (dispatch) => {
      const {
        data: { data },
      } = await axios.get(`${apiresource}/HRMS Nationality?limit_page_length=0`);
      dispatch({
        type: action_types.NATIONALITY,
        data: data,
      });
    };
  };


export const getRaceDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Race`);
        dispatch({
            type: action_types.RACE,
            data: data,
        });
    };
};

export const getReligionDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Religion`);
        dispatch({
            type: action_types.RELIGION,
            data: data,
        });
    };
};

export const getApplicationTypeDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application Type`);
        dispatch({
            type: action_types.APPLICATION_TYPE,
            data: data,
        });
    };
};

export const getGenderDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Gender`);
        dispatch({
            type: action_types.GENDER,
            data: data,
        });
    };
};

export const getEnglishQualificationDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/English Qualification`);
        dispatch({
            type: action_types.ENG_QUALIFICATION,
            data: data,
        });
    };
};


export const getProgNameDrop = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_program_names_list`);
        dispatch({
            type: action_types.PROGRAMME_NAME,
            data: message,
        });
    };
};

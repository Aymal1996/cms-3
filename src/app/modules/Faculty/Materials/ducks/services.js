import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getMaterilContent = (id) => {
  return axios.get(`${apiMethod}/faculty.materials.getting_single_material?name=${id}`);
};

export const getRevisionGraph = (material_name) => {
  return axios.get(`${apiMethod}/faculty.materials.getting_revisions_list_for_graph?material_name=${material_name}`);
};

export const getMaterialWeeks = (code, type) => {
  return axios.get(`${apiMethod}/faculty.materials.get_weeks_for_module?module_code=${code}&material_type=${type}`);
};

export const addMaterial = (payload) => {
  return axios.post(`${apiMethod}/faculty.materials.add_single_materials`, payload);
};

export const editMaterial = (payload, id) => {
  console.log('edit', payload, id);
  let updatePayload = { materials: [{ ...payload.materials[0], deleted_modules: payload.deleted_modules, name: id }] };
  return axios.post(`${apiMethod}/faculty.materials.add_single_materials`, updatePayload);
};

export const reviseMaterial = (payload, id) => {
  let updatePayload = { materials: [{ ...payload.materials[0], deleted_modules: payload.deleted_modules, name: id }] };
  return axios.post(`${apiMethod}/faculty.materials.revise_material`, updatePayload);
};

export const assignModulesToSpecific = (payload, id, mname, mtype) => {
  return axios.post(`${apiMethod}/faculty.materials.update_material_module_section`, {
    ...payload,
    name: id,
    material_name: mname,
    material_type: mtype,
  });
};

export const addAppreciation = (payload) => {
  return axios.post(`${apiMethod}/faculty.materials.add_appreciation`, payload);
};

export const getModuleNames = () => {
  return axios.get(`${apiMethod}/faculty.materials.module_list`);
};

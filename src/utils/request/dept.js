import axios from "./axios";

export const getDeptByDeptCode = async (deptCode) => {
  return axios.get('/data/dept', {
      params: {
        deptCode: deptCode
      }
    })
    .then(res => res.data)
    .catch(err => err)
}
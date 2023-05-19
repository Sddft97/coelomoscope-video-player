import axios from "./axios";

export const getCourses = async ({
  page = 1,
  limit = 30
} = {}) => {
  return axios.get("/data/course", {
      params: {
        _page: page,
        _limit: limit
      }
    })
    .then(response => response.data)
    .catch(error => error)
}

export const getCourseByCourseId = async (courseId) => {
  return axios.get("/data/course", {
      params: {
        courseId: courseId,
      }
    })
    .then(response => response.data)
    .catch(error => error)
}

export const getCourse = async ({
  courseName,
  deptCode,
  courseTypeId,
  page = 1,
  limit = 30
} = {}) => {
  return axios.get("/data/course", {
      params: {
        courseName_like: courseName || undefined,
        deptCode: deptCode || undefined,
        courseTypeId: courseTypeId || undefined,
        _page: page,
        _limit: limit
      }
    })
    .then(response => response.data)
    .catch(error => error)
}

export const getAllCourseType = async () => {
  return axios.get("/data/coursetype")
    .then(response => response.data)
    .catch(error => error)
}

export const getCourseTypeById = async (courseTypeId) => {
  return axios.get(`/data/coursetype/${courseTypeId}`)
    .then(response => response.data)
    .catch(error => error)
}
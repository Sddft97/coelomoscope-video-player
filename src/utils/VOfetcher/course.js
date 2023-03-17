import {
  getCourseByCourseId
} from "../request/course";


export const getCourseInfo = async (courseId) => {
  try {
    return (await getCourseByCourseId(courseId)).data[0];
  } catch (err) {
    console.error(err)
    return Promise.reject(err);
  }
}
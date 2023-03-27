import {
  ref,
  reactive
} from 'vue'
import {
  getCourse
} from "../request/course";

export let courseQueryCriteria = reactive({
  courseName: '',
  courseTypeId: '',
  deptCode: ''
});

export const globalCourseSearch = async ({
  page = 1,
  limit = 30
} = {}) => {
  try {
    return await getCourse({
      courseName: courseQueryCriteria.courseName,
      courseTypeId: courseQueryCriteria.courseTypeId,
      deptCode: courseQueryCriteria.deptCode,
      page: page,
      limit: limit
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
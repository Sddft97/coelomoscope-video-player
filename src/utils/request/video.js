import axios from "./axios";

export const getVideosByCourseId = async ({
  courseId,
  page = 1,
  limit = 10
} = {}) => {
  return axios.get('/data/video', {
      params: {
        courseId: courseId,
        _page: page,
        _limit: limit
      }
    })
    .then(res => res.data)
    .catch(err => err);
}
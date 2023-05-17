import {
  courseQueryCriteria,
} from "../global-search/course";
import {
  resetQueryCriteria
} from "../global-search/common";

export const toHome = (router) => {
  resetQueryCriteria(courseQueryCriteria);
  router.push({
    name: 'Home'
  });
}
export const toAccountView = (router) => {
  const accountHomeUrl = router.resolve({
    name: 'AccountHome'
  });
  window.open(accountHomeUrl.href, '_blank');
}
export const toCourseDetail = (router, courseId) => {
  router.push({
    name: 'CourseDetail',
    params: {
      courseId
    }
  })
}

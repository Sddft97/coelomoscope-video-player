import {
  ref,
  reactive
} from 'vue'

let searchData = reactive({
  videoName: '',
  videoType: '',
  createTimeBegin: '',
  createTimeEnd: '',
  lastVisitTimeBegin: '',
  lastVisitTimeEnd: '',
});

let search = () => {
  console.log(searchData);
}

let reset = () => {
  function clearValue(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] == 'object') {
        clearValue(obj[key])
      } else {
        obj[key] = '';
      }
    });
  };
  clearValue(searchData);
  console.log('reset')
}

let data = {
  searchData
}

let method = {
  search,
  reset
}

export {
  data,
  method
}
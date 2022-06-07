// widgets.js

// Actions 액션 타입들을 정해주는 
// const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'bucket/CREATE'; //추가하기
const DELETE = 'bucket/DELETE';
const UPDATE = 'bucket/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';

const initialState = {
  list :  [
    {text:"영화관 가기", completed: false},
    {text:"매일 책읽기", completed: false},
    {text:"잠 푹 자기", completed: false}
],
}

// Action Creators
// export function loadWidgets() {
//   return { type: LOAD };
// }
export function createBucket(bucket){
  console.log("액션을 생성할거야!")
  return {type : CREATE, bucket:bucket}
}

// export function createWidget(widget) {
//   return { type: CREATE, widget };
// }

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE":{
      console.log("이제값을 바꿀거야!")
      const new_bucket_list =[...state.list, action.bucket]
      return { list : new_bucket_list }
    }
    case "bucket/UPDATE":{
      console.log("이제값을 업뎃할거야!")
      const new_bucket_list =state.list.map((l,idx)=>{
        console.log(l);
        if(action.bucket_index == idx){
          return {...l, completed:true}
        }else{
          return l
        }
      })
      console.log({list: new_bucket_list})
      return {list: new_bucket_list};
    }
    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
    return {list: new_bucket_list};
    }
    default: return state;
  }
}
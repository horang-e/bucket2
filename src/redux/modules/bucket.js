// widgets.js
import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
//파이어베이스랑 통신하는 부분

// Actions 액션 타입들을 정해주는 
// const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'bucket/CREATE'; //추가하기
const DELETE = 'bucket/DELETE';
const UPDATE = 'bucket/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';
//미들웨어 액션
const LOAD = "bucket/LOAD";

const initialState = {
  list: [
    // { text: "영화관 가기", completed: false },
    // { text: "매일 책읽기", completed: false },
    // { text: "잠 푹 자기", completed: false }
  ],
}

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}
export function createBucket(bucket) {
  console.log("액션을 생성할거야!")
  return { type: CREATE, bucket: bucket }
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
//middlewares

//가지고오기
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    console.log(bucket_data)

    let bucket_list = [];

    bucket_data.forEach((doc) => {
      console.log(doc.data())
      bucket_list.push({ id: doc.id, ...doc.data() })
    })
    console.log(bucket_list)

    dispatch(loadBucket(bucket_list));
  }
}
//생성하기
export const createBucketFB = (bucket) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    console.log((await getDoc(docRef)).data())
    // const _bucket= await getDoc(docRef)
    const bucket_data = { id: docRef.id, ...bucket }
    console.log(bucket_data);

    dispatch(createBucket(bucket_data))
  }
}
//수정하기
export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id)
    await updateDoc(docRef, {completed: true })

    console.log(getState().bucket)
    const _bucket_list = getState().bucket.list;

    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    dispatch(updateBucket(bucket_index))
  }
}

//삭제하기
export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if(!bucket_id){
      window.alert("아이디가 없네요")
      return;
    }


    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef)

    const _bucket_list = getState().bucket.list;

    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    dispatch(deleteBucket(bucket_index))
  }
}




// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list }
    }
    case "bucket/CREATE": {
      console.log("이제값을 바꿀거야!")
      const new_bucket_list = [...state.list, action.bucket]
      return { list: new_bucket_list }
    }
    case "bucket/UPDATE": {
      console.log("이제값을 업뎃할거야!")
      const new_bucket_list = state.list.map((l, idx) => {
        console.log(l);
        if (action.bucket_index == idx) {
          return { ...l, completed: true }
        } else {
          return l
        }
      })
      console.log({ list: new_bucket_list })
      return { list: new_bucket_list };
    }
    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { list: new_bucket_list };
    }
    default: return state;
  }
}
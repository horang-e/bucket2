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

//firebase에서 가져와
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

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}
//middlewares (함수를 실행하는 함수)

//가지고오기
export const loadBucketFB = () => {
  return async function (dispatch) {
    //App.js에서 useEffect로loadBucketFB 실행하는 디스패치 쪽지 넘겨줌 내용없음
    const bucket_data = await getDocs(collection(db, "bucket"));
    //db에서 콜렉션네임이 "버켓"인 독스를 가져온다. promise다음 단계
    console.log(bucket_data)

    let bucket_list = [];
    //버켓리스트라는 빈배열을 만들어
    bucket_data.forEach((doc) => {
      console.log(doc.data())
      bucket_list.push({ id: doc.id, ...doc.data() })
    })//foreach 리턴값을 반환하지 않는 함수 맵과 똑같지만 리턴반환 안하는것만 다름
    //id 값의 경우는 파이어베이스에 추가시 자동으로 주어진다. id는 리덕스에 주기위해서 배열에 집어넣어줌.
    // Firebase에서 가져온 데이터를 버켓js에 차곡차곡 넣어줘요
    console.log(bucket_list)

    dispatch(loadBucket(bucket_list));
    //loadBucket 리듀서로 쪽지전달
  }
}
//생성하기
export const createBucketFB = (bucket) => {
  return async function (dispatch) {
    //App.js에서 dispatch로 새로운 배열을 bucket이라는 이름으로 넘겨줌
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    //FB콜렉션으로 위에서 받은 버켓을 더해줌
    console.log((await getDoc(docRef)).data())
    // const _bucket= await getDoc(docRef)
    const bucket_data = { id: docRef.id, ...bucket }
    //App.js에서 dispatch로 넘겨준 { text: text.current.value, completed: false }를 풀고 파이어베이스에서 만들어준 id를 함께 하나로 만들어줌
    console.log(bucket_data);

    dispatch(createBucket(bucket_data))
    //위에 새로 id text completed값을 가진 덩어리를 createBucket으로 넘김
  }
}
//수정하기
export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id)
    //얜 왜다른지 잘 모르겠어... 위에서는 컬렉션에서 가져왔는데 얘는음..
    //Detail.js에서 가져온 지정리스트의 id값을 bucket_id라고 정의 (쪽지내용)
    console.log(docRef)
    //어 그 풀어헤치기 전의 값으로 나와 프라미스값은아니고 그다음값
    await updateDoc(docRef, { completed: true })
    // 업뎃독 사용해서 docRef의 completed값을 트루로 바꾸어줌
    console.log(getState().bucket)
    //getState..는 왜..쓰더라 업뎃한내용을 가져와서 다시 띄워주는건가..? 업뎃했다는걸 redux한테도 알리는건가?음 그런듯
    const _bucket_list = getState().bucket.list;
    //업뎃된 내용 배열
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    //버킷리스트 안의 아이디값이 지정리스트의 아이디값과 같으면 리턴해?? findIndex는 인덱스값 가져오는 함순데..
    dispatch(updateBucket(bucket_index))
    //자 이제 업뎃된 내용을 리듀스 함수로 보내볼까
  }
}

//삭제하기
export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요")
      return;
    }//이건 버킷 아이디없으면 알러트 띄워주는 에러 핸들링


    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef)
    //deleteDoc으로 선택한 아이디와 파라미터 값이 일치하면 삭제해주는거임
    const _bucket_list = getState().bucket.list;
    //삭제해준 리스트를 가져와
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    //삭제해준 리스트와 같은 아이디값을 가진 인덱스 값을 반환ㄹ함
    dispatch(deleteBucket(bucket_index))
    // 자 이제 리듀스 함수로 가져가봐
  }
}




// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list }
      //리덕스에 파이어스토어에 있는 데이터를 붙여주는거야..?ㅇㅇ 얘를 이제 state로 내보내서 필요한곳에서 받아다가쓰는거야 
      //Load같은 경우에는 dispatch값이 바뀔때마다 로드될수있도록 useEffect설정해주는거심
      //여기서 액션은 미들웨어 함수 말하는거야
    }
    case "bucket/CREATE": {
      console.log("이제값을 바꿀거야!")
      const new_bucket_list = [...state.list, action.bucket]
      //state는 여기페이지에 저장된 데이터 값
      // 위에 미들웨어에서 보내준(새로 만든) bucket_data가 action.bucket
      return { list: new_bucket_list }
    }
    case "bucket/UPDATE": {
      console.log("이제값을 업뎃할거야!")
      const new_bucket_list = state.list.map((l, idx) => {
        console.log(l);
        //위에서 업뎃해서 가져온 리스트를 map으로 돌려 여까지하면 db엔 true로 업데이트 되지만 콘솔찍어보면 아직 false로ㅓ 표시됨 이걸 처리해주기 위해서 아래 돌려
        if (action.bucket_index == idx) {
          //위에 미들웨어 액션함수에서 버켓 인덱스로 정의된 인덱스값과 map돌릴때의 인덱스값이 같다면 
          return { ...l, completed: true }
          //그 리스트의 컴플리트를 true로 바꿔라
        } else {
          return l
          //아니면 그냥 원래대로둬
        }
      })
      console.log({ list: new_bucket_list })
      return { list: new_bucket_list };
      // 그 고친애를 list에 추가추가
    }
    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        //리덕스 안에 있는 애 중에 삭제된 인덱스 값을 지닌게 있으면 그거 빼고 배열로 전달해 주겠니?
        console.log(l)
        //위에서 업뎃해서 가져온 리스트를 map으로 돌려 여까지하면 db엔 삭제된걸로 업데이트 되지만 콘솔찍어보면 있는걸로 표시됨 이걸 처리해주기 위해서 아래 돌려
        return parseInt(action.bucket_index) !== idx;
      });
      return { list: new_bucket_list };
      //이제 그거 삭제된 채로 리덕스에 새 배열 만들어보겠어?
    }
    default: return state;
  }
}
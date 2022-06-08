//Detail.js
// 리액트 패키지를 불러옵니다.
import React from "react";
// 라우터 훅을 불러옵니다.
import { useParams, Link} from "react-router-dom";
// redux hook을 불러옵니다.
import { useSelector, useDispatch } from "react-redux";
import {deleteBucket, updateBucket,updateBucketFB, deleteBucketFB} from './redux/modules/bucket'

const Detail = (props) => {
// url 파라미터에서 인덱스 가져오기
  const params = useParams();
 //detail 페이지의 params깂
  const dispatch = useDispatch();
  // console.log(dispatch)
  // 스토어에서 상태값 가져오기
  const bucket_list = useSelector((state) => state.bucket.list);
  //useSelector로 스토어에서 FB에서 꺼내온 버켓리스트 가져옴
  console.log(bucket_list)
  const deleteBucketList = () =>{
    dispatch(deleteBucketFB(bucket_list[bucket_index].id))
  }
  const updateBucketList = () =>{
    dispatch (updateBucketFB(bucket_list[bucket_index].id))
    //파라미터 값 번째의 버켓리스트의 ID값을 updateBucketFB에 보내줌
  }
  const bucket_index = params.index;
  console.log(bucket_index)
  return (
    <>
  <h1>{bucket_list[bucket_index]?bucket_list[bucket_index].text:""}</h1>
  <Link to= "/"><button onClick={deleteBucketList}>삭제하기</button></Link>
  <Link to= "/"><button onClick={updateBucketList}>완료하기</button></Link>
  </>)
};

export default Detail;
import React from "react";
import BucketList from "./BucketList";
import Detail from "./Detail";
import "./style.css";
import styled from "styled-components";
// useDispatch를 가져와요!
import {useDispatch} from "react-redux";
// 액션생성함수도 가져오고요!
import { createBucket } from "./redux/modules/bucket";
import { Route, Routes } from "react-router-dom";
import {db} from "./firebase";
// App.js
function App() {
  
  const text = React.useRef(null);
  // useHistory 사용하는 것과 비슷하죠? :)
  const dispatch = useDispatch();

  const addBucketList = () => {
    // 스프레드 문법! 기억하고 계신가요? :)
    // 원본 배열 list에 새로운 요소를 추가해주었습니다.
    // 여긴 이제 주석처리!
    // setList([...list, text.current.value]);

    dispatch(createBucket({text :text.current.value}));
    console.log(text.current.value)
  };

    return (
      <div className="App">
        <div>
        
          {/* <Route
            path="/"
            exact
            render={(props) => <BucketList list={list} />}
          /> */}
          {/* 이제는 render를 사용해서 list를 넘겨줄 필요가 없죠! 버킷리스트가 리덕스에서 데이터를 알아서 가져갈거니까요! */}
         
        <Container>
          <Title>내 버킷리스트</Title>
          <Line />
          <Routes>
         <Route path="/" element={<BucketList />} />
         <Route path="/detail/:index" element={<Detail />} />
        </Routes>
        </Container>
        </div>
        <div>
          <input type="text" ref={text}/>
          <button style={{marginTop:"20px"}} onClick={addBucketList}>추가하기</button>
        </div>
      </div>
    );
  }



const Container = styled.div`
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  margin: auto;
  height: 80vh;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
`;

export default App;

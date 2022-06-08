import React from "react";
import BucketList from "./BucketList";
import Detail from "./Detail";
import "./style.css";
import styled from "styled-components";
// useDispatch를 가져와요!
import { useDispatch } from "react-redux";
// 액션생성함수도 가져오고요!
import { createBucketFB, loadBucketFB, createBucket } from "./redux/modules/bucket";
import { Route, Routes } from "react-router-dom";
import { db } from "./firebase";

// App.js
function App() {

  const text = React.useRef(null);
  // useHistory 사용하는 것과 비슷하죠? :)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadBucketFB());
  },[dispatch])

  const addBucketList = () => {
    dispatch(createBucketFB({ text: text.current.value, completed: false }));
    text.current.value="";
  };

  return (
    <div className="App">
      <div>
        <Container>
          <Title>TODO LIST🍊 </Title>
          <Line />
          <Routes>
            <Route path="/" element={<BucketList />} />
            <Route path="/detail/:index" element={<Detail />} />
          </Routes>
        </Container>
      </div>
      <div>
        <input type="text" ref={text} />
        <button style={{ marginTop: "20px" }} onClick={addBucketList}>추가하기</button>
      </div>
    </div>
  );
}



const Container = styled.div`
  background-color: #fff;
  width: 60vw;
  max-width: 350px;
  /* margin: auto; */
  height: 70vh;
  padding: 16px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
`;

export default App;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BucketList = () => {
  let navigate = useNavigate();
  
  // 여기에서 state는 리덕스 스토어가 가진 전체 데이터예요.
  // 우리는 그 중, bucket 안에 들어있는 list를 가져옵니다.
  const my_lists = useSelector((state) => state.bucket.list);
  // 리듀서에서 보낸 스테이트, 리듀서함수이름bucket, 그안의 list
  console.log(my_lists)
  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle
            completed={list.completed}
            className="list_item"
            key={index}
            onClick={() => {
              navigate("/detail/" + index);
              console.log(list)
            }}
          >

            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 60vh;
`;

const ItemStyle = styled.div`
border: rgb(250, 250, 250) 2px solid;
border-radius: 40px;
padding: 16px;
margin: 8px;
background-color: ${(props) => props.completed ? "tomato" : "rgb(168, 206, 221)"};
text-align : center;


&:hover{
  background-color: ${(props) => props.completed ? "rgb(241, 130, 110)" : "rgb(192, 215, 224)"};
}
`;

export default BucketList;
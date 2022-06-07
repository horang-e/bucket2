import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BucketList = (props) => {
  let navigate = useNavigate();
  //   이 부분은 주석처리!
  //   console.log(props);
  //   const my_lists = props.list;
  // 여기에서 state는 리덕스 스토어가 가진 전체 데이터예요.
  // 우리는 그 중, bucket 안에 들어있는 list를 가져옵니다.
  const my_lists = useSelector((state) => state.bucket.list);
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
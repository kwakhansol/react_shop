import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button,Jumbotron} from 'react-bootstrap';
import styled from 'styled-components';
import './Detail.scss';
import { CSSTransition } from "react-transition-group"; 
// react-transition-group 라이브러리는 컴포넌트 등장/업데이트시 transition 쉽게쉽게 줄수있도록 도와주는 라이브러리이다.
let 박스 = styled.div`
  padding:20px;

`;

let 제목 = styled.h4`
  font-size:25px;
  color : ${ props => props.색상}
`;

function Detail(props) {
  // 숙제
  // useEffect( ()=>{
  //   //  2초 후에 alert 안보이게 해주셈
  //   let 타이머 = setTimeout(()=>{alert},2000); 
  // });
  // 숙제풀이
  let [alert, alert변경] = useState(true);
  
  let [누른탭, 누른탭변경] = useState(0); // 지금 누른 번호 , 몇번째 버튼 눌렀는지 저장할 state 데이터 만들어줌
  let [스위치, 스위치변경] = useState(false);

  useEffect(()=>{
    let 타이머 = setTimeout(()=>{ alert변경(false) },2000);
    console.log('찍히나안찍히나확인')
    return ()=>{clearTimeout(타이머)}
  },[ ]);

  let history = useHistory();
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(상품){
    return 상품.id == id
  });
  let [inputData, inputData변경] = useState('');
    return (
    <div className="container">
        <div className="row">
          <div className="col-md-6">
            <박스>
              <제목 className="red">Detail</제목>
            </박스>
            {/* {inputData}
            {/* <input onChange={(e)=>{inputData변경(e.targtet.value) }}/>  */}
            {/* <input onChange={(e)=>{inputData변경(e.target.value)}} /> */}
            {
              alert === true
              ? <div className="my-alert">
                  <p>재고가 얼마 남지 않았습니다!</p>
                </div>
              : null
            }
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <Info 재고={props.재고}></Info>
            <button className="btn btn-danger orderBtn" onClick={()=>{ props.재고변경([])}}>주문하기</button> 
            <button className="btn btn-danger cartBtn" onClick={()=>{
              history.push('/Cart');
            }}>장바구니</button> 
          </div>
        </div>
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0" >
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={ ()=>{ 스위치변경(false); 누른탭변경(0) }}>상세정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={ ()=>{ 스위치변경(false); 누른탭변경(1) }}>리뷰</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" onClick={ ()=>{ 스위치변경(false); 누른탭변경(2) }}>문의</Nav.Link>
            </Nav.Item>
        </Nav>
        {/* state 가 0이면 0번째 div 보여줌 */}
        {/* if 문을 이용해서 조건문을 이용해 div를 보여주기 위해 컴포넌트를 만들어보자. TapContent */}
        {/* 내가 csstransition으로 감싸고 싶은 곳 감싸기 (애니메이션 필요한곳) */}
        {/* in, className, timeout 넣기 */}
        {/* in은 애니메이션 동작 스위치라고 생각하면 된다. true일때만 에니매이션이 부여가 된다.*/}
        {/* 어떨때 true여야 하는가? > 버튼 눌렀을 때!  변수나 state로 저장해서 쓰자!*/}
        <CSSTransition in={스위치} classNames="wow" timeout={500}> 
          <TapContent 누른탭={누른탭} 스위치변경={스위치변경}/>
        </CSSTransition>    
    </div>  
    )
}
function TapContent(props){
  useEffect (()=>{
    props.스위치변경(true);
  });

  if (props.누른탭 === 0){
    return <div>여기는 상세정보</div>
  } else if (props.누른탭 === 1){
    return <div>여기는 리뷰</div>
  } else if (props.누른탭 ===2){ 
    return <div>여기는 문의</div>
  }
}

function Info(props){
  return(
    <p> 재고: {props.재고[0]} </p>
  )
}
export default Detail;
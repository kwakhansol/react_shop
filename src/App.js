 /* eslint-disable */
import React,{useContext, useState} from 'react';
import './App.css';
import { Navbar, Nav, NavDropdown, Button,Jumbotron} from 'react-bootstrap';
import Data from './data.js';
import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';
import styled from 'styled-components';

// 1. [contextAPI] createContext 같은 값을 공유할 범위 생성
let 재고context = React.createContext();

// 2. 같은 값을 공유할 html을 범위로 싸매기


function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경]=useState([10,11,12]);

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">ShoesMarket</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Navbar>

      {/* 매칭되는것을 다보여주기 때문에, exact속성을 적어주면 정확히 매칭될때만 보여줌 */}
      <Route exact path="/">
        {/* 대문 */}
        <Jumbotron className="background">
          <h1 className="mainTitle">봄맞이 할인 20% OFF</h1>
          <p className="comment">
            봄 따라 혜택 왔나 봄
          </p>
          <p>
            <Button variant="primary">더보기</Button>
          </p>
        </Jumbotron>
      {/* 상품리스트 */}
      {/* 상품3개 진열하기 ( 정확히 3등분 하고싶으면 이대로) */}
      <div className="container">
         <재고context.Provider value={재고}>
            <div className="row">{/* row 라고 쓰면 세로를 12줄로 쪼개겠다는 뜻 */}
              {/* ② 반복문 만들어서 적용해보기*/}
              {
                shoes.map((a,i)=>{
                  return <Card shoes={shoes[i]} i={i} key={i}/>
                })
              }
            </div>
          </재고context.Provider>
            {/* ① component 만들어서 적용해보기 : component , props
              <Card shoes={shoes[0]}/> 
              <Card shoes={shoes[1]}/>
            <Card shoes={shoes[2]}/> */}

              {/* compnent & props 전 */}
                {/* <div className="col-md-4">
                  <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
                  <h4>{shoes[0].title}</h4>
                  <p>{shoes[0].content}</p>
                  <span>{shoes[0].price}</span> 
                  </div>
                  <div className="col-md-4">
                  <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%"/>
                  <h4>{shoes[1].title}</h4>
                  <p>{shoes[1].content}</p> 
                  <span>{shoes[1].price}</span> 
                  </div>
                  <div className="col-md-4">
                  <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%"/>
                  <h4>{shoes[2].title}</h4>
                  <p>{shoes[2].content}</p>
                  <span>{shoes[2].price}</span> 
                </div> */}
             
  
        <button className="btn btn-primary moreBtn" onClick={()=>{
          // 서버에 GET 요청을 하는 코드
          // fetch('https://codingapple1.github.io/shop/data2.json').then()
          
          // 로딩중이라는 UI 띄움
          // UI 띄우고 만들게하는거 STATE로 미리 저장한다음, state가 true이면 보이게 해주세요 라고 코딩하면됨


          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{
            // 로딩중이라는 UI 안보이게 처리 (삭제)
            console.log(result.data);
            shoes변경([...shoes, ...result.data]);
          })
          .catch(()=>{
            // 로딩중이라는 UI 안보이게 처리 (삭제)
            console.log('실패했어요')
          })  
        }}>더보기</button>
      </div>
      </Route>
      <Route path="/detail/:id">
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">상품명</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
        </div>  */}
        {/* ▲ html 코드 대신에 만들어준 Detail.js 컴포넌트를 import 해온것을 사용한다. */}
        <Detail shoes={shoes} 재고 ={재고} 재고변경={재고변경} />
      </Route>

      <Route path="/cart">
        <Cart />
      </Route>
      <Route>

      </Route>
    </div>
  );
}

function Card(props){

  let 재고 = useContext(재고context);

  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <span>{props.shoes.price}</span> 
  </div>
  )
}

export default App;

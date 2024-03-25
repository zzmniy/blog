/*경고 메시지 없애는 코드*/ 
/*eslint-disable*/
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {  //부모 컴포넌트
  //글제목과 따봉을 각각의 상태로 관리함
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집','파이썬 독학']);
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  //따봉을 증가시키는 함수, 클릭한 글의 인덱스를 받아 해당 글의 따봉을 증가시킴
  const increaseLike = (i) => {
    //현재의 따봉 배열을 복사함
    const new따봉 = [...따봉];
    //클릭한 글의 인덱스에 해당하는 따봉을 1 증가
    new따봉[i] += 1;
    //변경된 따봉 배열로 상태를 업데이트
    따봉변경(new따봉);
  }



  return (
    <div className="App"> 
      
      <div className="black-nav">
        <h4> 짐니의 블로그</h4>
      </div>

      <button className="desc" onClick ={() =>{
        let desc = [...글제목];
        desc = desc.sort();
        글제목변경(desc);
      }}>
        가나다순 정렬
      </button>

      <button className="edit" onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
       }}>글 수정</button> 

   


      {
        글제목.map(function(a, i){
          return (
          <div className="list" ket={i}>
            
            <h4 onClick={()=>{
              setModal(!modal);
              setTitle(i)
              }}> { 글제목[i]}
               
              {/* 따봉을 클릭 시 increaseLike 함수를 호출함 */}
              <span onClick={(e)=>{e.stopPropagation();
                increaseLike(i)
              }}>&nbsp;&nbsp; ❤️ {따봉[i]}</span>

            <button className="delete"onClick={(e)=>{e.stopPropagation();
              let copy = [...글제목];
              let copy2 = [...따봉]; // 따봉 배열도 함께 조작
              copy.splice(i,1);
              copy2.splice(i,1); // 따봉 배열에서도 해당 위치의 따봉을 삭제
              글제목변경(copy);
              따봉변경(copy2); // 따봉 배열 변경 적용
            }}>
              글 삭제
            </button>

            </h4>

            <p>2월 17일 발행</p>
          </div>
          )
        })
      }

      <input onChange={(e)=>{
         입력값변경(e.target.value);
          }}>
      </input>

      <button onClick={()=>{
          let copy = [...글제목];
          let copy2 = [...따봉]; // 따봉 배열도 함께 조작
          copy.unshift(입력값); 
          copy2.unshift(0); // 새로운 글에 대한 따봉 추가
          글제목변경(copy);
          따봉변경(copy2); // 따봉 배열 변경 적용
          입력값변경('');
      }}>글 발행</button>

      {
        modal == true ? <Modal title={title} 글제목 ={글제목} 글제목변경={글제목변경} /> : null
      }

    </div>
  );

}

function Modal(props){  //자식 컴포넌트
  const[수정값, 수정값변경] = useState('');

  return (
      <div className="modal" style={{background: 'pink'}}>
        <h4>{ props.글제목[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        
        <input value={수정값} onChange={(e)=>{
          수정값변경(e.target.value)
        }}></input>

        <button onClick={()=>{    
          let copy=[...props.글제목];
          copy[0] = (입력값);
          props.글제목변경(copy);
        }}>글 수정</button>
      </div>
  )  
}

export default App;
const easyBtn = document.querySelector('#easy-btn');
const normalBtn = document.querySelector('#normal-btn');
const hardBtn = document.querySelector('#hard-btn');
const timer = document.querySelector('#timer');
const gameBoard = document.querySelector('#game-board');
const cover = document.querySelector('#cover');

/* 순위 관련 요소 */
const easyTbody = document.querySelector("#easy-table > tbody");
const normalTbody = document.querySelector("#normal-table > tbody");
const hardTbody = document.querySelector("#hard-table > tbody");


/* 모달 관련 요소 */
const clearModal = document.querySelector('#claer-modal');
const myModal = new bootstrap.Modal('#claer-modal', {
  keyboard: false
});

const modalDifficulty = document.querySelector('#difficulty');
const playerName = document.querySelector('#player-name');
const record = document.querySelector('#record');
const saveRecord = document.querySelector('#save-record');

const coverHeight = [110, 350, 590];

let difficulty; // 난이도 저장 변수
let timerInverter; // 시간 저장 변수
let coverInverter; // 커버 인터벌 저장 변수
let sec=0; // 지난 초
let ms=0; // 지난 밀리초

let prevClick = 0; // 이전 클릭 숫자
let saveCount; // 만들어진 숫자칸 개수 저장용 변수

/* 쉬움 버튼 클릭 시 */
easyBtn.addEventListener('click', e => {
  timer.innerText = "00 : 00";
  cover.style.display = "flex";
  difficulty = "쉬움";
  startTimer();
  createBoard(10);
});

/* 보통 버튼 클릭 시 */
normalBtn.addEventListener('click', e => {
  timer.innerText = "00 : 00";
  cover.style.display = "flex";
  difficulty = "보통";
  startTimer();
  createBoard(30);
});

/* 어려움 버튼 클릭 시 */
hardBtn.addEventListener('click', e => {
  timer.innerText = "00 : 00";
  cover.style.display = "flex";
  difficulty = "어려움";
  startTimer();
  createBoard(50);
});




/* 게임판 만들기 */
function createBoard(count){
  // count : 만들려는 숫자 칸 개수
  saveCount = count;
  // gameBoard.innerHTML = ""; /* 이전 판 지우기 */
  document.querySelectorAll("#game-board .row").forEach((item, index) => {
    item.remove();
  });

  const set = new Set();
  while(set.size < count){
    set.add( Math.floor(Math.random() * count + 1));
  }

  const arr = Array.from(set);

  let row;
  let col;
  for(let i=0 ; i<count ; i++){
    if(i % 5 === 0){
      row = document.createElement("div");
      row.classList.add("row");
      gameBoard.append(row);
    }

    col = document.createElement("div");
    col.classList.add("col");
    col.textContent= arr[i];

    // 숫자가 클릭된 경우
    col.addEventListener('click', e => {

      // 순서대로 클릭된 경우
      if(prevClick + 1 === arr[i]){
        e.target.classList.add("check");
        prevClick++;
      }

      // 전부 클릭한 경우
      const checkCount = document.querySelectorAll(".col.check").length;
      if(saveCount === checkCount){
        clearInterval(timerInverter);

        modalDifficulty.innerText = difficulty;
        record.innerText = timer.innerText;

        myModal.show(clearModal);
      }
    });
    row.append(col);
  }
}

/* 타이머 시작 */
function startTimer(){
  sec=0;
  ms=0;
  prevClick = 0;
  timer.classList.remove("fail");
  clearInterval(timerInverter);
  clearInterval(coverInverter);


  /* 커버 타이머 */
  let coverCount = 3;
  cover.innerText = "3";
  coverInverter = setInterval(()=>{

    /* 커버 타이머가 끝난 경우 */
    if(coverCount === 1){
      clearInterval(coverInverter);
      cover.style.display = "none";

      /* 타이머 시작 */
      timerInverter = setInterval(()=>{
        ms++;
        if(ms === 100){
          sec++;
          ms = 0;
        }
        
        sec = Number(sec) < 10 ? "0"+Number(sec) : Number(sec);
        ms = ms < 10 ? "0"+ms : ms;
    
        timer.textContent = `${sec} : ${ms}`;
    
        /* 99.99초가되면 타이머 종료 */
        if(Number(sec) === 99 && Number(ms) ===99){
          clearInterval(timerInverter);
          timer.classList.add("fail");
        }
      },10);
    }

    coverCount--;
    cover.innerText = coverCount;

  }, 1000);
}


/** 기록 저장 버튼 클릭 시 */
saveRecord.addEventListener('click', e => {

  fetch("/faster/insert", {
    method : "POST",
    headers : {"Content-Type" : "application/json"  },
    body : JSON.stringify({
      "fasterName" : playerName.value,
      "fasterRecord" : record.innerText,
      "difficulty" : difficulty
    })
  })
  .then(resp => resp.text())
  .then(result => {
    if(result > 0){
      myModal.hide(clearModal);
      playerName.value ="";
      seletRank(easyTbody, '쉬움');
      seletRank(normalTbody, '보통');
      seletRank(hardTbody, '어려움');
    }

  })
  .catch( e => {
    console.log(e);
    console.log("기록 저장 중 오류 발생");
  });

});

// 순위 조회
function seletRank(tbody, diff){
  fetch("/faster/selectRank?difficulty=" + diff)
  .then(resp => resp.json())
  .then(rankList => {
    tbody.innerHTML = "";

    for(let i=0 ; i<rankList.length ; i++){
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      th.innerText = i+1;
      td1.innerText = rankList[i].fasterName;
      td2.innerText = rankList[i].fasterRecord;

      tr.append(th, td1, td2);
      tbody.append(tr);
    }

  })
  .catch( e => {
    console.log("순위 목록이 없음");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  seletRank(easyTbody, '쉬움');
  seletRank(normalTbody, '보통');
  seletRank(hardTbody, '어려움');
})
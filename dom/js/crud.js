
/* =========================
   HTML 요소 가져오기
========================= */
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const count = document.querySelector("#count");

/* =========================
   할 일 데이터를 저장하는 배열
========================= */
let tasks = [
  {
    id: 1,
    text: "HTML 공부하기",
    done: false,
  },
  // 하나의 할 일 데이터는 id, text, done 속성을 가진 객체로 구성
  {
    id: 2,
    text: "CSS 공부하기",
    done: false,
  },
];

// 다음에 사용할 고유 id 번호
let nextId = 3;

/* =========================
   R - 목록 출력 (Read)
========================= */
function renderTasks() {
  // 함수는 정의만으로 실행되지 않음
  // renderTasks()를 호출해야 함수 내부 코드가 실행됨

  // 기존 화면 비우기 (초기화)
  taskList.innerHTML = "";
  // 빈 문자열을 대입하여 기존 HTML 내용을 제거

  // 배열의 데이터를 하나씩 화면에 출력
  tasks.forEach((task) => {
    // console.log(task);

    const liE = document.createElement("li");
    // 배열의 데이터 개수만큼 li 요소가 생성됨

    /* 할 일 내용 */
    const spanE = document.createElement("span");
    spanE.className = "task-text";
    spanE.textContent = task.text;

    // 완료 여부에 따라 클래스 추가
    if (task.done) {
      spanE.classList.add("done");
    }

    /* ★ 완료 체크 버튼 */
    const checkBtn = document.createElement("button");

    // 삼항 연산자: 조건 ? 참일 때 : 거짓일 때
    checkBtn.textContent = task.done ? "완료 취소" : "완료";
    // done이 true이면 "완료 취소", false이면 "완료"

    // 완료 체크 버튼 클릭 시 실행
    checkBtn.addEventListener("click", () => {
      task.done = !task.done;
      // ! 연산자로 true와 false를 반전

      renderTasks();
      // 변경된 데이터를 기준으로 화면 다시 출력
    });

    /* ★ 수정 버튼 */
    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.className = "edit-btn";

    // 수정 버튼 클릭 시 실행
    editBtn.addEventListener("click", () => {
      const nextText = prompt(
        "수정할 내용을 입력하세요.",
        task.text
      );

      // console.log(nextText);

      // 취소하지 않았고, 공백 제거 후 빈 문자열이 아닐 때 수정
      if (nextText !== null && nextText.trim() !== "") {
        task.text = nextText.trim();
      }

      // !== null : 취소 버튼을 누르지 않았는지 확인
      // && : 두 조건이 모두 참일 때 실행
      // trim() : 문자열 양쪽 끝의 공백 제거

      renderTasks();
      // 변경된 내용을 화면에 다시 출력
    });

    /* ★ 삭제 버튼 */
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "delete-btn";

    // 삭제 버튼 클릭 시 실행
    deleteBtn.addEventListener("click", () => {
      // 삭제 여부를 확인하는 창 출력
      const ok = confirm("정말 삭제할까요?");
      // 확인을 누르면 true, 취소를 누르면 false 반환

      // console.log(ok);

      if (ok) {
        // 현재 항목을 제외한 데이터로 배열 갱신
        tasks = tasks.filter((item) => {
          // 삭제하려는 id와 다른 항목만 남기기
          return item.id !== task.id;
        });

        // filter()는 조건이 true인 요소만 모아 새 배열 생성
        // 중괄호를 사용하는 콜백은 return을 명시해야 함
        // 중괄호가 없는 화살표 함수는 결과가 자동 반환됨

        renderTasks();
        // 삭제가 승인되었을 때 화면 다시 출력
      }
    });

    /* 버튼을 담을 영역 */
    const actions = document.createElement("div");
    actions.className = "actions";

    // append() : 여러 요소를 한 번에 자식으로 추가 가능
    actions.append(checkBtn, editBtn, deleteBtn);

    /* 목록에 내용과 버튼 넣기 */
    liE.append(spanE, actions);

    // 생성한 li를 실제 목록에 추가
    taskList.append(liE);
  });

  /* 전체 개수와 완료 개수 */
  const doneCount = tasks.filter((task) => {
    // 완료 상태가 true인 할 일만 반환
    return task.done;
  }).length;

  // console.log(doneCount);

  // 전체 할 일 개수와 완료한 할 일 개수 출력
  count.textContent = `전체 ${tasks.length}개 / 완료 ${doneCount}개`;
}

/* =========================
   C - 새 할 일 추가 (Create)
========================= */
// submit 이벤트는 기본적으로 폼 제출을 수행함
// 이때 페이지가 새로고침될 수 있음
taskForm.addEventListener("submit", (e) => {
  // form 제출 시 기본 동작(새로고침 등) 방지
  e.preventDefault();

  // 사용자가 입력한 값 가져오기
  const text = taskInput.value.trim();
  // value : 입력창에 입력된 값
  // trim() : 문자열 양쪽 끝의 공백 제거
  // 공백만 입력한 경우 빈 문자열로 처리하기 위해 사용

  // 빈 내용은 등록하지 않음
  if (text === "") {
    alert("할 일을 입력하세요.");

    return;
    // 현재 이벤트 콜백 함수 실행 종료
    // 아래의 할 일 추가 코드는 실행되지 않음
  }

  // 배열에 새 객체 추가
  tasks.push({
    id: nextId,
    text: text,
    done: false,
  });
  // text : 사용자가 입력한 문자열
  // done : 새 할 일의 기본 완료 상태는 false

  // console.log(tasks);

  nextId++;
  // 새 항목에 사용할 id가 중복되지 않도록 증가

  // 입력창 비우기
  taskInput.value = "";

  // 변경된 배열을 화면에 다시 출력
  renderTasks();
});

/* =========================
   처음 화면 출력
========================= */
renderTasks();
// 페이지에서 스크립트가 실행될 때 초기 목록 출력

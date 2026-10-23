window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const dots = document.querySelectorAll(".dot");
  // gotop
  const gotopBtn = document.querySelector("#goTop");
  //   console.log(sections);
  //   console.log(dots);
  // console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > 600) {
    gotopBtn.classList.add("active");
  } else {
    gotopBtn.classList.remove("active");
  }
  // gotop버튼 클릭시 위로 가기 함수
  gotopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  });
  sections.forEach((section, index) => {
    // console.log(section, index);
    // 섹션영역이 확면 위쪽에서 얼마나 떨어져 있는지 확인
    // getBoundingClientRect: 영역이 브라우저 화면의 맨 위에서 얼마나 떨어져 있는지 알려주는 메서드
    const top = section.getBoundingClientRect().top;
    // console.log(top);
    // 화면 위쪽에서 가까워지면 해당 메뉴 활성화
    if (top < window.innerHeight / 2) {
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dots[index].classList.add("active");
    }
  });
});

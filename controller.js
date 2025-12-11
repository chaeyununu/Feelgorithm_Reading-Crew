// controller.js

document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const step4 = document.getElementById("step4");
  const result = document.getElementById("result");

  const nameInput = document.getElementById("nameInput");
  const nameBtn = document.getElementById("nameBtn");

  const canvasContainer = document.getElementById("canvas-container");
  const resultMsg = document.getElementById("resultMsg");

  let userName = "";

  function showScreen(id) {
    screens.forEach((el) => {
      el.classList.toggle("active", el.id === id);
    });
  }

  // 1단계: 이름 입력 후 "다음"
  nameBtn.addEventListener("click", () => {
    const value = nameInput.value.trim();
    if (!value) {
      alert("이름을 입력해 주세요.");
      nameInput.focus();
      return;
    }
    userName = value;
    showScreen("step2");
  });

  // 2단계: 토론 스타일 선택
  document.querySelectorAll(".styleBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const style = btn.dataset.style;
      window.customStyle = style; // p5 전역값 변경
      showScreen("step3");
    });
  });

  // 3단계: 책 주제 선택
  document.querySelectorAll(".topicBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.dataset.topic;
      window.customTopic = topic; // p5 전역값 변경
      showScreen("step4");
    });
  });

  // 4단계: 분위기 선택 → 결과 + 로고 표시
  document.querySelectorAll(".moodBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;
      window.customMood = mood; // p5 전역값 변경

      const nameText = userName || "당신";
      resultMsg.textContent = `${nameText}의 리딩 크루 로고가 완성되었습니다.`;
      showScreen("result");

      // 결과 화면에서 위쪽으로 정렬
      document.body.classList.add("result-shown");

      // p5 로고 켜기
      window.showLogo = true;
      // 캔버스 컨테이너 보이게
      canvasContainer.style.display = "block";
    });
  });
});

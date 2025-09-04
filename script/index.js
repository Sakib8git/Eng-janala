const lodeLesson = () => {
  const lessonUrl = "https://openapi.programming-hero.com/api/levels/all";
  fetch(lessonUrl)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// !note: lodeLevelWord diye "displayLesson" er click korle Id receive
const lodeLevelWord = (id) => {
  const wordsUrl = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(wordsUrl)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      removeActive();
      //  *note: "active class" add kora holo
      clickBtn.classList.add("active");
      displayLevelWords(data.data);
      // *"removeActive call koeche"  nicher theke
    });
};
// *note:remove all "active class style" except selected one
const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => {
    // *bug:remove all active
    btn.classList.remove("active");
  });
};

// !display words
const displayLevelWords = (words) => {
  const wordsCon = document.getElementById("words-con");
  wordsCon.innerHTML = "";
  //   *fixme: jokhon kono lesson pabe na tokhon eta dekhabe
  if (words.length == 0) {
    wordsCon.innerHTML = `<div class="text-center col-span-full space-y-6">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="font-ban text-gray-500 text-xl mt-3">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </h1>
          <h2 class="font-ban text-4xl font-bold ">
             নেক্সট Lesson এ যান
          </h2>
        </div>`;
    return;
  }
  //   *--------------------------------------

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${
            word.word ? word.word : "❗not Found"
          } </h2>
          <p class="font-semibold">Meaning /Pronounciation</p>
          <div class="text-2xl font-medium font-ban">"${
            word.meaning ? word.meaning : "❗not Found"
          } / ${word.pronunciation ? word.pronunciation : "❗not Found"}"</div>
          <div class="flex justify-between mt-4 px-2">
            <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    wordsCon.append(card);
  });
};

// !display lesson
const displayLesson = (lessons) => {
  // *1call parent and empty
  const lessonCon = document.getElementById("lesson-con");
  lessonCon.innerHTML = "";
  lessons.forEach((lesson) => {
    // *2 creat child
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="lodeLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}</button
              >`;
    lessonCon.append(btnDiv);
  });
};

lodeLesson();

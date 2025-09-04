const lodeLesson = () => {
  const lessonUrl = "https://openapi.programming-hero.com/api/levels/all";
  fetch(lessonUrl)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
// id: 5;
// level: 1;
// meaning: "আগ্রহী";
// pronunciation: "ইগার";
// word: "Eager";
// !note: lodeLevelWord diye click korle Id receive
const lodeLevelWord = (id) => {
  const wordsUrl = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(wordsUrl)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};
// !display words
const displayLevelWords = (words) => {
  const wordsCon = document.getElementById("words-con");
  wordsCon.innerHTML = "";
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
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-circle-info"></i></button>
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
                <button onclick="lodeLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}</button
              >`;
    lessonCon.append(btnDiv);
  });
};

lodeLesson();

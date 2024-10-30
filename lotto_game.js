const readline = require("readline");

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function RandomLotto(realPrice) {
  let array = [];
  for (let i = 0; i < realPrice; i++) {
    let randomArray = new Set();
    while (randomArray.size < 6) {
      randomArray.add(Math.floor(Math.random() * 45) + 1);
    }
    array.push(Array.from(randomArray).sort((a, b) => a - b));
  }

  return array;
}

function LottoResult(myLotto, number, bonus) {
  let array = number.split(",").map((v) => Number(v));
  let count = 0;
  for (let i = 0; i < myLotto.length; i++) {
    for (let j = 0; j < i.length; j++) {
      if (myLotto[i].includes(array[i])) {
        count++;
      }
    }
    console.log(count);
  }
}

// readline을 사용하여 입력받기
rl.question("로또를 얼마치 구매하셨습니까? ", (price) => {
  console.log(`${price / 1000}개를 구매하셨습니다`);
  let realPrice = price / 1000;
  console.log(RandomLotto(realPrice));
  let myLotto = RandomLotto(realPrice);
  rl.question("당첨번호를 입력하세요(,형태로 적어주세요) ", (number) => {
    console.log(`당첨번호는 ${number}입니다`);
    rl.question("보너스 번호를 입력하세요", (bonus) => {
      console.log(`보너스번호는 ${bonus} 입니다`);
      LottoResult(myLotto);
    });
  });
});

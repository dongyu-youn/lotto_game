const MissionUtils = require("@woowacourse/mission-utils");

class App {
  play() {
    this.isStart();
  }
  isStart() {
    MissionUtils.Console.readLine("게임을 시작하겠습니다", (input) => {
      console.log(input); // 필요하면 입력을 처리할 수 있습니다
    });
  }
  RandomPick() {
    let random = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    return random;
  }
  NumberInput() {
    MissionUtils.Console.readLine(
      "3개의 값을 공백으로 구분하여 입력하시오",
      (input) => {
        const inputs = input.split(" ");
        // 배열의 각 요소 출력
        console.log(`${inputs[0]}`);
        console.log(`${inputs[1]}`);
        console.log(`${inputs[2]}`);
      }
    );
  }
  exception(inputs) {
    let isLength = inputs.length === 3;
    let isSame = new Set(inputs).size === 3;
    let isNumber = inputs.every((v) => !isNaN(v) && v !== "0");

    // 하나라도 조건을 만족하지 않으면 예외 발생
    if (!isLength || !isSame || !isNumber) {
      throw new Error("정확한 3개의 숫자를 입력해주세요");
    }
  }

  AnswerCorrect(computer, myanswer) {
    let strikes = 0;
    let balls = 0;
    for (let i = 0; i < 3; i++) {
      if (computer[i] === myanswer[i]) {
        console.log("strike");
        strikes++;
      } else if (computer.includes(myanswer[i])) {
        console.log("ball");
        balls++;
      }
    }
    if (strikes == 0 && balls == 0) {
      console.log("낫싱");
    }
    return { strikes, balls };
  }

  isResult(obj) {
    // 객체의 값들이 모두 0이면 "낫싱" 출력
    if (Object.values(obj).every((value) => value === 0)) {
      MissionUtils.Console.print("낫싱");
      return;
    }

    // 결과 출력
    let result = [];

    // 객체의 각 키와 값을 체크하여 결과 문구 추가
    if (obj.ball > 0) {
      result.push(`${obj.ball}볼`);
    }
    if (obj.strike > 0) {
      result.push(`${obj.strike}스트라이크`);
    }

    

    // 출력
    MissionUtils.Console.print(result.join(" "));
  }
  playgame() {
    let result;
    do {
      const myanswer = this.NumberInput();
      //플레이어정답과 컴퓨터 비교
      result = this.AnswerCorrect(this.RandomPick, myanswer);
      this.isResult(result)
  
    }
    while ()
  }
}

module.exports = App;

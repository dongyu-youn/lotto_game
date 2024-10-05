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
        const inputs = input.split("");
        // 배열의 각 요소 출력
        console.log(`${inputs[0]}`);
        console.log(`${inputs[1]}`);
        console.log(`${inputs[2]}`);
      }
    );
  }
}

module.exports = App;

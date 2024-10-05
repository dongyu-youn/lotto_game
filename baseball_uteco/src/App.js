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
}

module.exports = App;

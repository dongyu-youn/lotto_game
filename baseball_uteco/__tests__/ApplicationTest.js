// Import App class and MissionUtils
const App = require("./App");
const MissionUtils = require("@woowacourse/mission-utils");

describe("App", () => {
  let app;

  // 각 테스트 전에 App 인스턴스를 생성
  beforeEach(() => {
    app = new App();
  });

  // MissionUtils.Console.readLine 함수를 mock 처리
  beforeAll(() => {
    jest
      .spyOn(MissionUtils.Console, "readLine")
      .mockImplementation((message, callback) => {
        callback("게임을 시작하겠습니다");
      });

    // MissionUtils.Random.pickUniqueNumbersInRange 함수를 mock 처리
    jest
      .spyOn(MissionUtils.Random, "pickUniqueNumbersInRange")
      .mockReturnValue([1, 2, 3]);
  });

  afterAll(() => {
    jest.restoreAllMocks(); // 모든 테스트 후 mock 복원
  });

  test("play 호출 시 isStart가 호출되어야 한다", () => {
    const spyIsStart = jest.spyOn(app, "isStart");

    app.play();

    expect(spyIsStart).toHaveBeenCalled(); // isStart가 호출되었는지 확인
  });

  test("isStart가 올바른 메시지를 출력하는지 확인", () => {
    const spyReadLine = jest.spyOn(MissionUtils.Console, "readLine");

    app.isStart();

    expect(spyReadLine).toHaveBeenCalledWith(
      "게임을 시작하겠습니다",
      expect.any(Function)
    ); // readLine이 올바른 메시지로 호출되었는지 확인
  });

  test("RandomPick이 1부터 9 사이의 고유한 세 숫자를 반환하는지 확인", () => {
    const randomNumbers = app.RandomPick();

    expect(MissionUtils.Random.pickUniqueNumbersInRange).toHaveBeenCalledWith(
      1,
      9,
      3
    ); // 올바른 인자들로 호출되었는지 확인
    expect(randomNumbers).toEqual([1, 2, 3]); // mock 처리된 숫자가 올바르게 반환되는지 확인
  });
});

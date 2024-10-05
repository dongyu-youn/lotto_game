const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

describe("App 클래스 테스트", () => {
  let app;

  // 각 테스트 전에 App 인스턴스를 생성
  beforeEach(() => {
    app = new App();
  });

  // MissionUtils의 readLine과 Random을 mock 처리
  beforeAll(() => {
    jest
      .spyOn(MissionUtils.Console, "readLine")
      .mockImplementation((message, callback) => {
        if (message === "3개의 값을 공백으로 구분하여 입력하시오") {
          callback("1 2 3");
        } else if (message === "게임을 시작하겠습니다") {
          callback("게임 시작!");
        }
      });

    jest
      .spyOn(MissionUtils.Random, "pickUniqueNumbersInRange")
      .mockReturnValue([4, 5, 6]);
  });

  afterAll(() => {
    jest.restoreAllMocks(); // 모든 mock을 복원
  });

  test("play 메서드 테스트 - 게임 시작 메시지 출력", () => {
    const spyConsoleLog = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    app.play();

    expect(spyConsoleLog).toHaveBeenCalledWith("게임 시작!");
  });

  test("RandomPick 메서드 테스트 - 1부터 9 사이의 고유한 3개의 숫자 반환", () => {
    const randomNumbers = app.RandomPick();

    expect(randomNumbers).toEqual([4, 5, 6]); // Mock 처리된 값이 반환되는지 확인
  });

  test("NumberInput 메서드가 공백으로 구분된 3개의 값을 입력받는지 테스트", () => {
    const spyConsoleLog = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    // 이전 로그 호출 기록을 모두 지움
    jest.clearAllMocks();

    app.NumberInput();

    // 입력된 값이 순서대로 출력되는지 확인
    expect(spyConsoleLog).toHaveBeenNthCalledWith(1, "1");
    expect(spyConsoleLog).toHaveBeenNthCalledWith(2, "2");
    expect(spyConsoleLog).toHaveBeenNthCalledWith(3, "3");
  });

  test("exception 메서드 테스트 - 올바르지 않은 입력 시 예외 발생", () => {
    // 중복된 값이 있는 경우 예외 발생 테스트
    expect(() => {
      app.exception(["1", "1", "2"]);
    }).toThrowError("정확한 3개의 숫자를 입력해주세요");

    // 숫자가 아닌 값이 포함된 경우 예외 발생 테스트
    expect(() => {
      app.exception(["1", "2", "a"]);
    }).toThrowError("정확한 3개의 숫자를 입력해주세요");

    // 0이 포함된 경우 예외 발생 테스트
    expect(() => {
      app.exception(["1", "2", "0"]);
    }).toThrowError("정확한 3개의 숫자를 입력해주세요");
  });

  test("AnswerCorrect 메서드 테스트 - 스트라이크와 볼 계산", () => {
    const result = app.AnswerCorrect([1, 2, 3], [1, 3, 2]);

    expect(result).toEqual({ strikes: 1, balls: 2 });

    const resultAllStrike = app.AnswerCorrect([1, 2, 3], [1, 2, 3]);

    expect(resultAllStrike).toEqual({ strikes: 3, balls: 0 });

    const resultNothing = app.AnswerCorrect([1, 2, 3], [4, 5, 6]);

    expect(resultNothing).toEqual({ strikes: 0, balls: 0 });
  });
});

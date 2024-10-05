const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

describe("App 클래스 테스트", () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  // readLine과 pickUniqueNumbersInRange를 mock 처리
  beforeAll(() => {
    jest
      .spyOn(MissionUtils.Console, "readLine")
      .mockImplementation((message, callback) => {
        // 적절한 상황별로 mock 처리된 입력을 반환
        if (message === "3개의 값을 공백으로 구분하여 입력하시오") {
          callback("1 2 3");
        }
        if (message === "게임을 시작하겠습니다") {
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
    const spyConsoleLog = jest.spyOn(console, "log");

    app.play();

    expect(spyConsoleLog).toHaveBeenCalledWith("게임 시작!");
  });

  test("RandomPick 메서드 테스트 - 1부터 9 사이의 고유한 3개의 숫자 반환", () => {
    const randomNumbers = app.RandomPick();

    expect(randomNumbers).toEqual([4, 5, 6]); // Mock 처리된 값이 반환되는지 확인
  });

  test("NumberInput 메서드 테스트 - 3개의 값을 공백으로 구분하여 입력받음", () => {
    const spyConsoleLog = jest.spyOn(console, "log");

    app.NumberInput();

    expect(spyConsoleLog).toHaveBeenNthCalledWith(1, "1"); // 첫 번째 값
    expect(spyConsoleLog).toHaveBeenNthCalledWith(2, "2"); // 두 번째 값
    expect(spyConsoleLog).toHaveBeenNthCalledWith(3, "3"); // 세 번째 값
  });

  test("exception 메서드 테스트 - 올바른 3자리 숫자 입력", () => {
    const validInput = ["1", "2", "3"];
    const result = app.exception(validInput);

    expect(result).toBe(true); // 유효한 입력의 경우 true 반환
  });

  test("exception 메서드 테스트 - 중복된 숫자가 있는 입력", () => {
    const invalidInput = ["1", "1", "2"];
    const result = app.exception(invalidInput);

    expect(result).toBe(false); // 중복된 숫자가 있으면 false 반환
  });

  test("exception 메서드 테스트 - 숫자가 아닌 입력 포함", () => {
    const invalidInput = ["1", "2", "a"];
    const result = app.exception(invalidInput);

    expect(result).toBe(false); // 숫자가 아닌 값이 있으면 false 반환
  });

  test("exception 메서드 테스트 - 0이 포함된 입력", () => {
    const invalidInput = ["1", "0", "2"];
    const result = app.exception(invalidInput);

    expect(result).toBe(false); // 0이 포함된 경우 false 반환
  });
});

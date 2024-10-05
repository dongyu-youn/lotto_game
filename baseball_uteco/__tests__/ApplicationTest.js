const App = require("./App");
const MissionUtils = require("@woowacourse/mission-utils");

describe("App 클래스 테스트", () => {
  let app;

  // 각 테스트 전에 App 인스턴스를 생성
  beforeEach(() => {
    app = new App();
  });

  // readLine을 mock 처리
  beforeAll(() => {
    jest
      .spyOn(MissionUtils.Console, "readLine")
      .mockImplementation((message, callback) => {
        // 사용자가 3개의 값을 입력한 것으로 가정
        if (message === "3개의 값을 공백으로 구분하여 입력하시오") {
          callback("1 2 3");
        }
      });
  });

  afterAll(() => {
    jest.restoreAllMocks(); // 모든 mock을 복원
  });

  test("NumberInput이 공백으로 구분된 3개의 값을 올바르게 입력받는지 확인", () => {
    const spyConsoleLog = jest
      .spyOn(console, "log")
      .mockImplementation((log) => log);

    app.NumberInput();

    // 입력한 값들이 각각 출력되는지 확인
    expect(spyConsoleLog).toHaveBeenCalledWith("1"); // 첫 번째 값
    expect(spyConsoleLog).toHaveBeenCalledWith("2"); // 두 번째 값
    expect(spyConsoleLog).toHaveBeenCalledWith("3"); // 세 번째 값
  });
});

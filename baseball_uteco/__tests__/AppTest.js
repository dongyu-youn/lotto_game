const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

describe("isResult 함수 테스트", () => {
  let app;

  beforeEach(() => {
    app = new App();
    jest.spyOn(MissionUtils.Console, "print").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("낫싱 결과 출력", () => {
    const result = { ball: 0, strike: 0 };
    app.isResult(result);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("낫싱");
  });

  test("1볼 1스트라이크 결과 출력", () => {
    const result = { ball: 1, strike: 1 };
    app.isResult(result);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("1볼 1스트라이크");
  });

  test("3볼 결과 출력", () => {
    const result = { ball: 3, strike: 0 };
    app.isResult(result);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("3볼");
  });

  test("2스트라이크 결과 출력", () => {
    const result = { ball: 0, strike: 2 };
    app.isResult(result);

    expect(MissionUtils.Console.print).toHaveBeenCalledWith("2스트라이크");
  });
});

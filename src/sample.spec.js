const { pleaseWork } = require("./sample");
const { API_URL } = require("./config").CONFIG;

describe("should work", () => {
  it("should log the correct API_URL based on env", () => {
    const logSpy = jest
      .spyOn(global.console, "log")
      .mockImplementation(() => {});

    pleaseWork();

    expect(logSpy).toHaveBeenCalledWith(API_URL);
  });
});

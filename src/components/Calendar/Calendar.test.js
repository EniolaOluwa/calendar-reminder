import Calender from "./index";
import { screen, render } from "@testing-library/react";

jest.mock();

describe("Calender", () => {
  it("should match screenshot", () => {
    const { container } = render(<Calender />);
    expect(container).toMatchSnapshot();
  });
});

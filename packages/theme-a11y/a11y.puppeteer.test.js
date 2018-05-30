import { trapFocus } from "./a11y";

describe("trapFocus()", () => {
  beforeEach(async () => {
    await page.setContent(`
    <script type="module">
      window.trapFocus = ${trapFocus.toString()}
    </script>
    <a id="outsideLink" href="#">Some outside link</a>
    <div id="container">
      <input id="textInput1" type="text" />
      <input id="textInput2" type="text" />
      <button id="button">Some button</button>
    </div>`);
  });

  test("traps focus to focusable elements within a container", async () => {
    await page.evaluate(() => {
      const container = document.getElementById("container");
      window.trapFocus(container);
    });

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const activeElement = await page.evaluate(() => document.activeElement.id);

    await expect(activeElement).toBe("textInput1");
  });

  test("focuses the first tabable element after tabbing the last tabable element in a container", () => {});

  test("focuses on the last tabable element when shift-tabbing from first tabbable element", () => {});

  test("focuses on first tabable element in container by default", () => {});

  test("accepts an optional argument to specify what element to initially focus on", () => {});
});

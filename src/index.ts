import puppeteer from "puppeteer";
import { config } from "./config";

const url = `https://www.vlr.gg/user/${config.PROFILE}`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.screenshot({ path: "example.png" });

  // geting the lasts posts from the user
  const lastPosts = await page.$$eval(".post-body > p", (el) =>
    el.map((text) => (text as HTMLElement).innerText)
  );

  // getting user name
  const username = await page.$eval(
    "#profile-header",
    (element) => (element as HTMLElement).innerText
  );
  await browser.close();
})();

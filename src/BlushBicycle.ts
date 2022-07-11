import { sendEmail } from "./util/Mailer";

const puppeteer = require("puppeteer");

export type Listing = {
  title: string;
  price: string;
  url: string;
  location: string;
  frameSize: string;
  type: string;
  description: string;
  img: string;
};

export class BlushBicycle {
  protected history: Listing[] = [];
  protected initialized = false;
  public async ride(url: String) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    page.on("console", async (msg: any) => {
      const msgArgs = msg.args();
      for (let i = 0; i < msgArgs.length; ++i) {
        console.log(await msgArgs[i].jsonValue());
      }
    });
    await page.goto(url);

    const listings = await page.evaluate(() => {
      const listings = document.querySelectorAll("div.bsitem");
      const listingArray = Array.from(listings);
      const listingInfo = listingArray.map((listing) => {
        const listingInfo: Listing = {
          title:
            listing?.querySelector("td:nth-of-type(2)")?.querySelector("a")
              ?.innerText || "",
          price:
            `$${
              listing
                ?.querySelector("td:nth-of-type(2) table")
                ?.textContent?.match(/\$([0-9]+\s[CAD|USD])/)?.[1]
            }` || "",
          location:
            listing
              ?.querySelector("td:nth-of-type(2) table")
              ?.textContent?.match(
                /([a-zA-Z][a-zA-Z|\s]+)\,([a-zA-Z|\s]+)\,\sCanada/
              )?.[1] || "",
          frameSize:
            listing
              ?.querySelector("td:nth-of-type(2)")
              ?.innerHTML?.match(
                /\<b\>Frame\sSize\s:\s\<\/b\>\s([0-9|a-zA-Z]+)/
              )?.[1] || "",
          type:
            listing
              ?.querySelector("td:nth-of-type(2)")
              ?.innerHTML?.match(/\<br\>\s([a-zA-Z|\s|\/]+)/)?.[1]
              ?.split("\n")[0] || "",
          url: listing?.querySelector("a")?.href || "",
          description:
            listing
              ?.querySelector("td:nth-of-type(2) table tbody tr:nth-of-type(4)")
              ?.textContent?.replace(/(\r\n|\n|\r)/gm, "")
              .split("[Read More]")[0]
              .trim() || "",
          img: listing?.querySelector("img")?.src || "",
        };
        return listingInfo;
      });
      return listingInfo;
    });

    await browser.close();

    for (const element of listings) {
      if (
        this.history.some((predicate: Listing) => predicate.url === element.url)
      )
        continue;

      this.history.unshift(element);
      this.history = this.history.slice(0, 1000);

      console.log(element);
      if (!this.initialized) continue;

      sendEmail(
        `${element.price} - ${element.title} | BlushCycle`,
        `<b>${element.title}</b><br><br>
        ${element.price}<br>
        ${element.type} - ${element.frameSize}<br>
        ${element.location}<br>
        <br>
        ${element.description}<br><br>
        <a href="${element.url}">${element.url}</a><br><br>
        ${element.img}
        `
      );

      await new Promise((r) => setTimeout(r, 500));
    }
    this.initialized = true;
    console.log("--------------------");
  }
}

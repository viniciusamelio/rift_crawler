import { Browser, Page } from "puppeteer";
import Build from "../../data/entities/build/buildInterface";

export default abstract class BuildScrapperService{
    async scrap() : Promise<void> {};

    async getData(browser: Browser, page: Page, href: String, role: String) : Promise<Build|undefined>{
        return {} as Build;
    }
}
import { Browser, Page } from "puppeteer";
import puppeteer from 'puppeteer';
import buildInterface from "../../data/entities/build/buildInterface";
import TierItem from "../../data/entities/tier/tierItem";
import BuildRepository from "../../data/repositories/buildRepository";
import getChampionData from "../useCases/champion/getChampionData";
import getCounterChampions from "../useCases/champion/getCounterChampions";
import getCounteredChampions from "../useCases/champion/getCounteredChampions";
import getEndgameItems from "../useCases/item/getEndgameItems";
import getStartingItems from "../useCases/item/getStartingItems";
import getPrimaryRunes from "../useCases/rune/getPrimaryRunes";
import getSecondaryRunes from "../useCases/rune/getSecondaryRunes";
import getSkillPriority from "../useCases/skill/getSkillPriority";
import getSpells from "../useCases/spell/getSpells";
import BuildScrapperService from "./buildScraperService";
import Build from "../../data/entities/build/buildInterface";

export default class TierListGGService implements BuildScrapperService {

    async scrap(): Promise<void> {
        const buildRepository = new BuildRepository();
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
        await page.goto('https://tierlist.gg/cheatsheet');

        const champions = await page.evaluate(() => {
            const tierListItemsHtml = document.querySelectorAll('.TierItem');
            const tierListItems: TierItem[] = [];
            tierListItemsHtml.forEach((item) => {
                const href = item?.attributes?.getNamedItem('href')?.value;
                const role = href?.split('/')[3];
                tierListItems.push({ href, role });
            });
            return tierListItems;
        });

        const championList = Array.from(champions);

        for (const key in championList) {
            const build = await this.getData(browser, page, championList[key].href, championList[key].role);

            await buildRepository.save(build);
        }


    }

    async getData(browser: Browser, page: Page, href: String | null | undefined, role: String | null | undefined): Promise<Build | undefined> {
        try {
            if (href == null) {
                throw "Href não pode ser nulo";
            }
            await page.goto(`https://tierlist.gg${href}`, { timeout: 0, waitUntil: 'load' });
            const championData = await getChampionData(page);
            const spells = await getSpells(page);
            const skillsPriority = await getSkillPriority(page);
            const startingItems = await getStartingItems(page);
            const endGameItems = await getEndgameItems(page);
            const primaryRunes = await getPrimaryRunes(page);
            const secondaryRunes = await getSecondaryRunes(page);

            const counterHref = href?.split('/Build')[0] + '/Counter';
            await page.goto(`https://tierlist.gg${counterHref}`);

            const counteredChampions = await getCounteredChampions(page);
            const counterChampions = await getCounterChampions(page);


            setTimeout(() => { }, 500);

            return {
                champion: championData,
                spells,
                skillsPriority,
                items: {
                    starting: startingItems,
                    endgame: endGameItems
                },
                runes: [
                    primaryRunes,
                    secondaryRunes
                ],
                counters: counterChampions,
                countered: counteredChampions
            }
        } catch (error) {
            console.log(error);

        }
    }

}

import { Page } from "puppeteer";
import CounterChampion from "../../../data/entities/champion/counterChampionInterface";

const getCounterChampions = async(page: Page) : Promise<Array<CounterChampion>>=>await page.evaluate(()=>{
    const container = document.querySelectorAll('.ChampProfile-counter-inner div.w-full')[1];
    const championsSet : CounterChampion[] = [];
    container?.querySelectorAll('.counterList a').forEach(a=>{
        championsSet.push({
            name: a.querySelector('img')?.attributes.getNamedItem('alt')?.value,
            src: a.querySelector('img')?.attributes.getNamedItem('data-src')?.value,
            winrate: a.querySelector('.counterList-item-info')?.textContent?.replace('\n','').replace('\n',''),
            gamesCount: a.querySelector('.counterList-item-title p')?.textContent
        });
    });
    return championsSet;
});

export default getCounterChampions;
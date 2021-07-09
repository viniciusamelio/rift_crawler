import { Page } from "puppeteer";

const getChampionData = async(page: Page)=>await page.evaluate(()=>{

    const portraitContainer = document.querySelector('.ChampProfile-hero-portrait img');
    const portrait = portraitContainer?.attributes.getNamedItem('data-src')?.value;
    const tier = document.querySelector('.ChampProfile-hero-portrait .badge img')?.attributes.getNamedItem('data-src')?.value;
    const name = portraitContainer?.attributes.getNamedItem('alt')?.value;
    const role = document.querySelector('.ChampProfile-hero-details .flex .ml-2')?.textContent;

    const championStatsContainer = document.querySelector('.ChampProfile-stats');
    const gamesAnalyzed = championStatsContainer?.querySelector('.ChampProfile-stats-block p.h4')?.textContent;
    const winrate = championStatsContainer?.querySelectorAll('.ChampProfile-stats-block p.h4')[1]?.textContent;
    const pickrate = championStatsContainer?.querySelectorAll('.ChampProfile-stats-block p.h4')[2]?.textContent;
    const banrate = championStatsContainer?.querySelectorAll('.ChampProfile-stats-block p.h4')[3]?.textContent;

    return {
        portrait,
        name,
        role,
        gamesAnalyzed,
        winrate,
        tier,
        pickrate,
        banrate
    }
});

export default getChampionData;
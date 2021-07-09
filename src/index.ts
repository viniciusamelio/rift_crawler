import puppeteer from 'puppeteer';
import getChampionData from './domain/useCases/champion/getChampionData';
import getCounterChampions from './domain/useCases/champion/getCounterChampions';
import getCounteredChampions from './domain/useCases/champion/getCounteredChampions';
import getEndgameItems from './domain/useCases/item/getEndgameItems';
import getStartingItems from './domain/useCases/item/getStartingItems';
import getPrimaryRunes from './domain/useCases/rune/getPrimaryRunes';
import getSecondaryRunes from './domain/useCases/rune/getSecondaryRunes';
import getSkillPriority from './domain/useCases/skill/getSkillPriority';
import getSpells from './domain/useCases/spell/getSpells';


async function main(){
    try {
        const browser = await puppeteer.launch({
            headless:true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://tierlist.gg/champions/KogMaw/Build');
        const championData = await getChampionData(page);
        const spells = await getSpells(page);
        const skillsPriority = await getSkillPriority(page);
        const startingItems = await getStartingItems(page);
        const endGameItems = await getEndgameItems(page);
        const primaryRunes = await getPrimaryRunes(page);
        const secondaryRunes = await getSecondaryRunes(page);
        
        await page.goto('https://tierlist.gg/champions/KogMaw/ADC/Counter');

        const counteredChampions = await getCounteredChampions(page);
        const counterChampions = await getCounterChampions(page);
        
        await browser.close();

    } catch (error) {
        console.log(error);
    }
}
main();
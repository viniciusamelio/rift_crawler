import puppeteer from 'puppeteer';
import getCounterChampions from './domain/useCases/champion/getCounterChampions';
import getCounteredChampions from './domain/useCases/champion/getCounteredChampions';
import getEndgameItems from './domain/useCases/item/getEndgameItems';
import getStartingItems from './domain/useCases/item/getStartingItems';
import getPrimaryRunes from './domain/useCases/rune/getPrimaryRunes';
import getSecondaryRunes from './domain/useCases/rune/getSecondaryRunes';
import getSpells from './domain/useCases/spell/getSpells';


async function main(){
    try {
        const browser = await puppeteer.launch({
            headless:true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://tierlist.gg/champions/KogMaw/Build');

        const spells = getSpells(page);
        const startingItems = getStartingItems(page);
        const endGameItems = getEndgameItems(page);
        const primaryRunes = getPrimaryRunes(page);
        const secondaryRunes = getSecondaryRunes(page);
        
        await page.goto('https://tierlist.gg/champions/KogMaw/ADC/Counter');

        const counteredChampions = getCounteredChampions(page);
        const counterChampions = getCounterChampions(page);
        
        await browser.close();

    } catch (error) {
        console.log(error);
    }
}
main();
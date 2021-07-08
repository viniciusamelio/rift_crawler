import puppeteer from 'puppeteer';

interface RuneSet {
    perkName: String|null|undefined;
    src: String|null|undefined;
    runes: Array<Object>;
}


async function main(){
    try {
        const browser = await puppeteer.launch({
            headless:true,
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();

        await page.goto('https://tierlist.gg/champions/KogMaw/Build');
        const spells = await page.evaluate(()=>{
            const container = document.querySelector('.ChampProfile-build-spells');
            const spellSet : Object[] = [];
            container?.querySelectorAll('img').forEach(img=>{
                spellSet.push({name: img.attributes.getNamedItem('alt')?.value,
                src: img.attributes.getNamedItem('data-src')?.value});
            });
            return spellSet;
        });

        const startingItems = await page.evaluate(()=>{
            const container = document.querySelector('.ChampProfile-build-start');
            const startingSet : Object[] = [];
            container?.querySelectorAll('img').forEach(img=>{
                startingSet.push({
                    name: img.attributes.getNamedItem('alt')?.value,
                    src: img.attributes.getNamedItem('data-src')?.value,
                });
            });

            return startingSet;
        });

        const endGameItems = await page.evaluate(()=>{
            const container = document.querySelector('.ChampProfile-build-winrate');
            const endGameSet : Object[] = [];
            container?.querySelectorAll('img').forEach(img=>{
                endGameSet.push({
                    name: img.attributes.getNamedItem('alt')?.value,
                    src: img.attributes.getNamedItem('data-src')?.value,
                });
            });

            return endGameSet;
        });

        const primaryRunes = await page.evaluate(()=>{
            const container = document.querySelector('.ChampProfile-runes .ChampProfile-runes-path');
            const runesSet : RuneSet = {perkName : container?.querySelector('.perk-title .h4')?.textContent ,
            src: container?.querySelector('.perk-image img')?.attributes.getNamedItem('data-src')?.value,
            runes:[]
            };
            container?.querySelectorAll('.active img').forEach(img=>{
                runesSet.runes.push({
                    name: img.attributes.getNamedItem('alt')?.value,
                    src: img.attributes.getNamedItem('data-src')?.value,
                });
            });

            return runesSet;
        });

        const secondaryRunes = await page.evaluate(()=>{
            const container = document.querySelectorAll('.ChampProfile-runes .ChampProfile-runes-path')[1];
            const runesSet : RuneSet = {perkName : container?.querySelector('.perk-title .h4')?.textContent ,
            src: container?.querySelector('.perk-image img')?.attributes.getNamedItem('data-src')?.value,
            runes:[]
            };
            container?.querySelectorAll('.active img').forEach(img=>{
                runesSet.runes.push({
                    name: img.attributes.getNamedItem('alt')?.value,
                    src: img.attributes.getNamedItem('data-src')?.value,
                });
            });

            return runesSet;
        });
        
        await page.goto('https://tierlist.gg/champions/KogMaw/ADC/Counter');

        const counteredChampions = await page.evaluate(()=>{
            const container = document.querySelector('.ChampProfile-counter-inner div');
            const championsSet : Object[] = [];
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

        const counterChampions = await page.evaluate(()=>{
            const container = document.querySelectorAll('.ChampProfile-counter-inner div.w-full')[1];
            const championsSet : Object[] = [];
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
        
        await browser.close();
    } catch (error) {
        console.log(error);
    }
}
main();
import { Page } from "puppeteer";
import Item from "../../../data/item/itemInterface";

const getStartingItems = async(page : Page)=> await page.evaluate(()=>{
    const container = document.querySelector('.ChampProfile-build-start');
    const startingSet : Item[] = [];
    container?.querySelectorAll('img').forEach(img=>{
        startingSet.push({
            name: img.attributes.getNamedItem('alt')?.value,
            src: img.attributes.getNamedItem('data-src')?.value,
        });
    });

    return startingSet;
});

export default getStartingItems;
import { Page } from "puppeteer";
import Item from "../../../data/entities/item/itemInterface";

const getEndgameItems = async(page: Page) : Promise<Array<Item>>=> await page.evaluate(()=>{
    const container = document.querySelector('.ChampProfile-build-winrate');
    const endGameSet : Item[] = [];
    container?.querySelectorAll('img').forEach(img=>{
        endGameSet.push({
            name: img.attributes.getNamedItem('alt')?.value,
            src: img.attributes.getNamedItem('data-src')?.value,
        });
    });

    return endGameSet;
});

export default getEndgameItems;
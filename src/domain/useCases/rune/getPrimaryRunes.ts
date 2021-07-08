import { Page } from "puppeteer";
import RuneSet from "../../../data/rune/runeSetInterface";

const getPrimaryRunes = async(page:Page) => await page.evaluate(()=>{
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

export default getPrimaryRunes;
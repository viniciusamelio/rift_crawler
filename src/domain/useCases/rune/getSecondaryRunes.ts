import { Page } from "puppeteer";
import RuneSet from "../../../data/rune/runeSetInterface";

const getSecondaryRunes = async(page: Page)=> await page.evaluate(()=>{
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

export default getSecondaryRunes;
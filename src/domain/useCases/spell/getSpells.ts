import { Page } from "puppeteer";
import Spell from "../../../data/entities/spell/spellInterface";

const getSpells  = async(page: Page) : Promise<Array<Spell>> => await page.evaluate(()=>{
    const container = document.querySelector('.ChampProfile-build-spells');
    const spellSet : Spell[] = [];
    container?.querySelectorAll('img').forEach(img=>{
        spellSet.push({name: img.attributes.getNamedItem('alt')?.value,
        src: img.attributes.getNamedItem('data-src')?.value});
    });
    return spellSet;
});

export default getSpells;
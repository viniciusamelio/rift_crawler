import { Page } from "puppeteer";
import Skill from "../../../data/skill/skillInterface";

const getSkillPriority = async(page:Page) => await page.evaluate(()=>{
    const container = document.querySelector('.ChampProfile-abilities-order .flex');
    const skillPriority : Skill[] = [];
    container?.querySelectorAll('.skill').forEach((div)=>{
        skillPriority.push({
            name: div.querySelector('img')?.attributes.getNamedItem('alt')?.value,
            key: div.attributes?.getNamedItem('data-content')?.value,
            src: div.querySelector('img')?.attributes.getNamedItem('data-src')?.value
        });
    });
    return skillPriority;
}); 

export default getSkillPriority;
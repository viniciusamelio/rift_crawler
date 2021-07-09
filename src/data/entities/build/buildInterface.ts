import CounterChampion from "../champion/counterChampionInterface";
import itemSet from "../item/itemSetInterface";
import RuneSet from "../rune/runeSetInterface";
import Skill from "../skill/skillInterface";
import Spell from "../spell/spellInterface";

export default interface Build{
    champion : Champion;
    spells : Array<Spell>;
    skillsPriority : Array<Skill>;
    items: itemSet;
    runes : Array<RuneSet>;
    counters : Array<CounterChampion>;
    countered : Array<CounterChampion>;
}
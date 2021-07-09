import Rune from "./runeInterface";

export default interface RuneSet {
    perkName: String|null|undefined;
    src: String|null|undefined;
    runes: Array<Rune>;
}
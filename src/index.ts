import TierListGGService from "./domain/services/tierListGGService";

async function main(){
    const scrapingService = new TierListGGService();
    scrapingService.scrap();
}
main();
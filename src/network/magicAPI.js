
import Request from './request';
import TestDataJSON from './testData.json';

// API config
const API_ENDPOINT = "https://api.magicthegathering.io";
const API_VERSION = "v1";

// API Resources
const RESOURCE_CARDS = "cards";

// Query modifiers
const NAME_MODIFIER = "name";
const CONTAINS_MODIFIER = "contains";
const COLOR_MODIFIER = "colors";
const IMAGE_URL = "imageUrl";

// Query constants
const MAX_SEARCH_QUERY_LENGTH = 30;
const MAX_PAGE_SIZE = 100;
const REQUEST_PAGE_SIZE = 20;

const CardColor = {
    Black   :   "black",
    Red     :   "red",
    Green   :   "green",
    Blue    :   "blue",
    White   :   "white"
}

class MagicAPI {

    // Getters
    static  get NAME_MODIFIER() {
        return NAME_MODIFIER;
    }

    static get CONTAINS_MODIFIER() {
        return CONTAINS_MODIFIER;
    }

    static get COLOR_MODIFIER() {
        return COLOR_MODIFIER;
    }

    static get IMAGE_URL() {
        return IMAGE_URL;
    }

    static get MAX_PAGE_SIZE() {
        return MAX_PAGE_SIZE;
    }

    static get REQUEST_PAGE_SIZE() {
        return REQUEST_PAGE_SIZE;
    }

    static get MAX_SEARCH_QUERY_LENGTH() {
        return MAX_SEARCH_QUERY_LENGTH;
    }

    static get CardColor() {
        return CardColor;
    }

    static get TestData() {
        return TestDataJSON;
    }

    // API methods
    static getCards(cancel) {

        let url = API_ENDPOINT + "/" + API_VERSION + "/" + RESOURCE_CARDS;
        return Request.get(url, cancel);

    }

    static getCardsPaginated(page, pageSize, cancel) {

        let url = API_ENDPOINT + "/" + API_VERSION + "/" + RESOURCE_CARDS + "?page=" + page + "&pageSize=" + pageSize;
        return Request.get(url, cancel);

    }

    static getCardsPaginatedWithFilters(page, pageSize, filters, cancel) {

        let url = API_ENDPOINT + "/" + API_VERSION + "/" + RESOURCE_CARDS + "?page=" + page + "&pageSize=" + pageSize;
        let keys = Object.keys(filters);

        // Loops through all applied filters and joins them up as query params
        for (let i=0; i < keys.length; i++) {
            url += "&" + keys[i] + "=" + filters[keys[i]];
        }

        return Request.get(url, cancel);

    }

    // Cancellation methods
    static getNewCancelSource() {

        return Request.getNewCancelSource();

    }

    static cancelRequest(cancelSource) {

        Request.cancelRequest(cancelSource);

    }

}

export default MagicAPI;
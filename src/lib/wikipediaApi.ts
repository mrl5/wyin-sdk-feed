export interface WikipediaApiQuery {
    // https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=10th%20century
    query: {
        pages: {
            [pageId: string]: PageExtract;
        };
    };
}

interface PageExtract {
    title: string;
    extract: string;
}

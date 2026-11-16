import { Bookmark } from "../src/modules/Bookmark";

test("reads both Webmarks tags and retains the legacy topic field", async () => {
    const document = "https://pod.example/bookmarks/index.ttl";
    const fetcher = jest.fn(async () => new Response(`
        @prefix bk: <http://www.w3.org/2002/01/bookmark#> .
        @prefix dct: <http://purl.org/dc/terms/> .
        <${document}#it> a bk:Bookmark ;
            bk:recalls <https://example.org/personal-data> ;
            dct:title "Personal data" ;
            bk:hasTopic "interop", "reading" .
    `, { headers: { "Content-Type": "text/turtle" } }));
    const bookmark = await Bookmark.get(document + "#it", fetcher);
    expect(bookmark).toMatchObject({
        title: "Personal data",
        link: "https://example.org/personal-data",
        topics: expect.arrayContaining(["interop", "reading"]),
        topic: expect.any(String),
    });
    expect(bookmark?.topics).toHaveLength(2);
    expect(bookmark?.topics).toContain(bookmark?.topic);
});

test("writes two replacement tags to the Solid document", async () => {
    const document = "https://pod.example/bookmarks/index.ttl";
    const fetcher = jest.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === "PATCH")
            return new Response(null, { status: 204 });

        return new Response(`
            @prefix bk: <http://www.w3.org/2002/01/bookmark#> .
            @prefix dct: <http://purl.org/dc/terms/> .
            <${document}#it> a bk:Bookmark ;
                bk:recalls <https://example.org/personal-data> ;
                dct:title "Personal data" ;
                bk:hasTopic <https://example.org/old-topic> .
        `, { headers: { "Content-Type": "text/turtle" } });
    });

    const bookmark = await Bookmark.update(document + "#it", {
        title: "Personal data",
        link: "https://example.org/personal-data",
        topics: ["interop", "reading"],
    }, fetcher);

    const patch = fetcher.mock.calls.find(([, init]) => init?.method === "PATCH")?.[1]?.body;
    expect(patch).toEqual(expect.stringContaining('"interop"'));
    expect(patch).toEqual(expect.stringContaining('"reading"'));
    expect(patch).toEqual(expect.stringContaining("https://example.org/old-topic"));
    expect(bookmark?.topics).toEqual(expect.arrayContaining(["interop", "reading"]));
    expect(bookmark?.topics).toHaveLength(2);
});

import {Price} from "./Price";

describe("FindPriceInMemoryCatalog", () => {

    test('Product Found', () => {
            const foundPrice: Price = Price.cents(795)
            const catalog: InMemoryCatalog = new InMemoryCatalog(new Map<string, Price>([["12345", foundPrice]]))
            expect(foundPrice).toEqual(catalog.findPrice("12345"))
        }
    )

    test("Product Not Found", () => {
        const catalog: InMemoryCatalog = new InMemoryCatalog(new Map<string, Price>([]))
        expect(null).toEqual(catalog.findPrice("12345"))
    })
    
})

export class InMemoryCatalog {
    private pricesByBarCode: Map<string, Price>

    public constructor(pricesByBarCode: Map<string, Price>) {
        this.pricesByBarCode = pricesByBarCode;
    }

    public findPrice(barcode: string): Price {
        return this.pricesByBarCode.get(barcode) ?? null
    }
}
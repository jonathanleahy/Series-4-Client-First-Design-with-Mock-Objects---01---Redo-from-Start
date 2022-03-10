import {Price} from "./Price";
import {Catalog} from "./Catalog";

describe("FindPriceInMemoryCatalog", () => {
    test('Product Found', () => {
            const foundPrice: Price = Price.cents(795)
            const catalog: Catalog = catalogWith("12345", foundPrice)
            expect(foundPrice).toEqual(catalog.findPrice("12345"))
        }
    )

    test("Product Not Found", () => {
        const catalog: Catalog = catalogWithout("12345")
        expect(null).toEqual(catalog.findPrice("12345"))
    })
})

function catalogWith(barcode: string, price: Price): Catalog {
    return new InMemoryCatalog(new Map<string, Price>([[barcode, price]]))
}

function catalogWithout(barcodeToAvoid: string): Catalog {
    return new InMemoryCatalog(new Map<string, Price>())
}

export class InMemoryCatalog implements Catalog {
    private pricesByBarCode: Map<string, Price>

    public constructor(pricesByBarCode: Map<string, Price>) {
        this.pricesByBarCode = pricesByBarCode;
    }

    public findPrice(barcode: string): Price {
        return this.pricesByBarCode.get(barcode) ?? null
    }
}
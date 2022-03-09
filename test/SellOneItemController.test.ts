import {createMock} from "ts-auto-mock";
import {when} from 'jest-when'

test('Product Found', () => {
        const irrelevantPrice: Price = Price.cents(795)

        const catalogMock: Catalog = createMock<Catalog>();
        when(catalogMock.findPrice).calledWith("12345").mockReturnValue(irrelevantPrice)

        const displayMock: Display = createMock<Display>();

        const saleController = new SaleController(catalogMock, displayMock)
        saleController.onBarcode("12345")

        expect(displayMock.displayPrice).toBeCalledTimes(1)
        expect(displayMock.displayPrice).toBeCalledWith(irrelevantPrice)
    }
)

export interface Catalog {
    findPrice(barcode: string): number
}

export class Price {
    public static cents(centsValue: number): string {
        return centsValue.toString()
    }
}

export interface Display {
    displayPrice(price: Price): void
}

export class SaleController {
    private catalog: Catalog
    private display: Display

    constructor(catalogM: Catalog, display: Display) {
        this.catalog = catalogM
        this.display = display
    }

    public onBarcode(barcode: string): void {
        this.display.displayPrice(this.catalog.findPrice(barcode))
    }
}


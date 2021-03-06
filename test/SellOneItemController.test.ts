import {createMock} from "ts-auto-mock";
import {when} from 'jest-when'
import {Price} from "./Price";
import {Catalog} from "./Catalog";

test('Product Found', () => {
        const irrelevantPrice: Price = Price.cents(795)

        const catalogMock: Catalog = createMock<Catalog>();
        when(catalogMock.findPrice).calledWith("::product found::").mockReturnValue(irrelevantPrice)

        const displayMock: Display = createMock<Display>();

        const saleController = new SaleController(catalogMock, displayMock)
        saleController.onBarcode("::product found::")

        expect(displayMock.displayPrice).toBeCalledTimes(1)
        expect(displayMock.displayPrice).toBeCalledWith(irrelevantPrice)
    }
)

test('Product Not Found', () => {
        const catalogMock: Catalog = createMock<Catalog>();
        when(catalogMock.findPrice).calledWith("::barcode_not_found::").mockReturnValue(null)

        const displayMock: Display = createMock<Display>();

        const saleController = new SaleController(catalogMock, displayMock)
        saleController.onBarcode("::barcode_not_found::")

        expect(displayMock.displayProductNotFoundMessage).toBeCalledTimes(1)
        expect(displayMock.displayProductNotFoundMessage).toBeCalledWith("::barcode_not_found::")
    }
)

test('Empty Barcode', () => {
        const displayMock: Display = createMock<Display>();

        const saleController = new SaleController(null, displayMock)
        saleController.onBarcode("")

        expect(displayMock.displayEmptyBarcodeMessage).toBeCalledTimes(1)
    }
)

export interface Display {
    displayPrice(price: Price): void

    displayProductNotFoundMessage(message: string): void

    displayEmptyBarcodeMessage(): void
}

export class SaleController {
    private catalog: Catalog
    private display: Display

    constructor(catalogM: Catalog, display: Display) {
        this.catalog = catalogM
        this.display = display
    }

    public onBarcode(barcode: string): void {
        if (barcode === "") {
            this.display.displayEmptyBarcodeMessage()
            return
        }

        const price: Price = this.catalog.findPrice(barcode)
        if (price === null) {
            this.display.displayProductNotFoundMessage(barcode)
        } else {
            this.display.displayPrice(price)
        }
    }
}

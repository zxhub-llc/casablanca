import { ZXProduct } from "../graphql";

export function calculateDiscountPercentage(
    regularPrice: string,
    salePrice: string
): number {
    const regular = parseFloat(regularPrice);
    const sale = parseFloat(salePrice);

    if (!regular || !sale || regular <= sale) {
        return 0;
    }

    return Math.round(
        ((regular - sale) / regular) * 100
    );
}

export function isProductInStock(
    product: ZXProduct
): boolean {
    return product.stockStatus === 'instock';
}

export function getProductStockMessage(
    product: ZXProduct
): string {
    if (product.stockStatus === "onbackorder" || product.stockStatus === "outofstock") {
        return "Agotado";
    }

    if (
        product.stockQuantity !== null &&
        product.stockQuantity <= 3
    ) {
        return `Solo quedan ${product.stockQuantity} en stock`;
    }

    return "En stock";
}
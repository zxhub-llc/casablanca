export function formatPrice(
    value: string | number,
    currency = "USD",
    locale = "en-US"
) {
    const amount =
        typeof value === "string"
            ? parseFloat(value)
            : value;

    if (isNaN(amount)) {
        return "";
    }

    return new Intl.NumberFormat(
        locale,
        {
            style: "currency",
            currency,
        }
    ).format(amount);
}
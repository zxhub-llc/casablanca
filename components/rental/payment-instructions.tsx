import type { ZXPaymentGateway } from "@/lib/graphql";

interface PaymentInstructionsProps {
    gateway: ZXPaymentGateway;
}

export function PaymentInstructions({ gateway }: PaymentInstructionsProps) {
    const hasAccountDetails = (gateway.accountDetails?.length ?? 0) > 0;

    if (!gateway.description && !hasAccountDetails) {
        return null;
    }

    return (
        <div className="space-y-3 rounded-md border bg-muted/30 p-4 text-sm">
            {gateway.description && (
                <div
                    className="text-muted-foreground [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: gateway.description }}
                />
            )}

            {hasAccountDetails && gateway.accountDetails && (
                <div className="space-y-3">
                    {gateway.accountDetails.map((acc, i) => (
                        <div key={i} className="rounded-md border bg-background p-3">
                            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                {acc.bankName && (
                                    <>
                                        <dt className="text-muted-foreground">Banco</dt>
                                        <dd className="font-medium">{acc.bankName}</dd>
                                    </>
                                )}
                                {acc.accountName && (
                                    <>
                                        <dt className="text-muted-foreground">Titular</dt>
                                        <dd className="font-medium">{acc.accountName}</dd>
                                    </>
                                )}
                                {acc.accountNumber && (
                                    <>
                                        <dt className="text-muted-foreground">N.º de cuenta</dt>
                                        <dd className="font-medium">{acc.accountNumber}</dd>
                                    </>
                                )}
                                {acc.sortCode && (
                                    <>
                                        <dt className="text-muted-foreground">Código</dt>
                                        <dd className="font-medium">{acc.sortCode}</dd>
                                    </>
                                )}
                                {acc.iban && (
                                    <>
                                        <dt className="text-muted-foreground">IBAN</dt>
                                        <dd className="font-medium">{acc.iban}</dd>
                                    </>
                                )}
                                {acc.bic && (
                                    <>
                                        <dt className="text-muted-foreground">BIC/SWIFT</dt>
                                        <dd className="font-medium">{acc.bic}</dd>
                                    </>
                                )}
                            </dl>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
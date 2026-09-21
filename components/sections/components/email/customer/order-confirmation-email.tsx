import { Body, Container, Head, Html, Tailwind, Text, Heading } from "react-email";

interface Props {
    orderNumber: string;
    customerName: string;
}

export function OrderConfirmationEmail({
    orderNumber,
    customerName,
}: Props) {
    return (
        <Html>
            <Head />

            <Tailwind>
                <Body>
                    <Container>

                        <Heading>
                            Pedido recibido
                        </Heading>

                        <Text>
                            Hola {customerName},
                        </Text>

                        <Text>
                            Pedido #{orderNumber}
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
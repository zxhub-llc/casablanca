import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Tailwind,
    Text,
} from "react-email";

interface Props {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
}

export function OrderAdminEmail({
    orderNumber,
    customerName,
    customerEmail,
}: Props) {
    return (
        <Html>
            <Head />

            <Tailwind>
                <Body>
                    <Container>

                        <Heading>
                            Nueva orden
                        </Heading>

                        <Text>
                            Orden: #{orderNumber}
                        </Text>

                        <Text>
                            Cliente: {customerName}
                        </Text>

                        <Text>
                            Email: {customerEmail}
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
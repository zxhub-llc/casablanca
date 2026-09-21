import { Html, Head, Tailwind, Body, Container, Heading, Text } from "react-email";

interface Props {
    name: string;
    email: string;
    vehicle: string;
}

export function QuoteAdminEmail({
    name,
    email,
    vehicle,
}: Props) {
    return (
        <Html>
            <Head />

            <Tailwind>
                <Body>
                    <Container>

                        <Heading>
                            Nueva solicitud de cotización
                        </Heading>

                        <Text>
                            Cliente: {name}
                        </Text>

                        <Text>
                            Email: {email}
                        </Text>

                        <Text>
                            Vehículo: {vehicle}
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
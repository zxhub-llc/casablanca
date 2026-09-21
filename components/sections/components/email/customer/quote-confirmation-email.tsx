import { Html, Head, Tailwind, Body, Container, Heading, Text } from "react-email";

interface Props {
    name: string;
    vehicle: string;
}

export function QuoteConfirmationEmail({
    name,
    vehicle,
}: Props) {
    return (
        <Html>
            <Head />

            <Tailwind>
                <Body>
                    <Container>

                        <Heading>
                            Solicitud recibida
                        </Heading>

                        <Text>
                            Hola {name},
                        </Text>

                        <Text>
                            Hemos recibido tu solicitud para:
                        </Text>

                        <Text>
                            {vehicle}
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
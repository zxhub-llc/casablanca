import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
    Text,
} from "react-email";

interface Props {
    email: string;
}

export function NewsletterWelcomeEmail({
    email,
}: Props) {
    return (
        <Html lang="es">
            <Head />

            <Preview>
                Bienvenido a Iscarsa
            </Preview>

            <Tailwind>
                <Body className="bg-white">
                    <Container className="mx-auto max-w-xl px-6 py-12">

                        <Heading className="text-3xl font-bold">
                            ¡Bienvenido a Iscarsa!
                        </Heading>

                        <Text>
                            Gracias por suscribirte
                            a nuestro newsletter.
                        </Text>

                        <Text>
                            Correo registrado:
                        </Text>

                        <Text className="font-bold">
                            {email}
                        </Text>

                        <Text>
                            A partir de ahora
                            recibirás noticias,
                            promociones y novedades
                            de nuestros vehículos y
                            servicios.
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default NewsletterWelcomeEmail;
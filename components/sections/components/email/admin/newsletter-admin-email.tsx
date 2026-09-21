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

export function NewsletterAdminEmail({
    email,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Nuevo suscriptor
            </Preview>

            <Tailwind>
                <Body className="bg-white">
                    <Container className="mx-auto max-w-xl px-6 py-12">

                        <Heading>
                            Nuevo suscriptor
                        </Heading>

                        <Text>
                            Se registró un nuevo
                            usuario al newsletter.
                        </Text>

                        <Text className="font-bold">
                            {email}
                        </Text>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default NewsletterAdminEmail;
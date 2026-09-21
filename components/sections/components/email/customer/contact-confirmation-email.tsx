import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "react-email";

interface Props {
    name: string;
}

export function ContactConfirmationEmail({
    name,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Hemos recibido tu solicitud
            </Preview>

            <Tailwind>
                <Body className="bg-slate-100 py-10 font-sans">

                    <Container className="mx-auto max-w-[650px] overflow-hidden rounded-2xl bg-white">

                        {/* HEADER */}
                        <Section className="bg-slate-950 px-10 py-8">
                            <Text className="m-0 text-sm uppercase tracking-[4px] text-slate-400">
                                ISCARSA
                            </Text>
                            <Heading className="m-0 mt-3 text-3xl font-bold text-white">
                                Hemos recibido tu mensaje
                            </Heading>
                            <Text className="mt-3 text-slate-300">
                                Gracias por comunicarte con nosotros.
                            </Text>
                        </Section>

                        {/* CONTENT */}

                        <Section className="px-10 py-10">
                            <Heading className="m-0 text-2xl text-slate-900">
                                Hola {name},
                            </Heading>
                            <Text className="mt-6 text-base leading-8 text-slate-700">
                                Hemos recibido correctamente tu solicitud y
                                nuestro equipo la revisará a la brevedad.
                            </Text>

                            <Text className="mt-4 text-base leading-8 text-slate-700">
                                Un asesor de ISCARSA se pondrá en contacto
                                contigo para brindarte la información que
                                necesitas y ayudarte con tu requerimiento.
                            </Text>
                            <Section className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                                <Heading className="m-0 text-lg text-slate-900">
                                    ¿Qué sigue?
                                </Heading>

                                <Text className="mt-4 text-slate-700">
                                    ✓ Revisaremos tu solicitud.
                                </Text>

                                <Text className="text-slate-700">
                                    ✓ Un asesor evaluará tu requerimiento.
                                </Text>

                                <Text className="text-slate-700">
                                    ✓ Nos comunicaremos contigo lo antes posible.
                                </Text>

                            </Section>
                            <Section className="text-center">
                                <Button
                                    href="https://iscarsa.com"
                                    className="box-border rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white no-underline"
                                >
                                    Visitar sitio web
                                </Button>
                            </Section>
                            <Hr className="my-8 border-slate-200" />
                            <Text className="text-sm leading-6 text-slate-500">
                                Si no realizaste esta solicitud, puedes ignorar
                                este correo electrónico.
                            </Text>
                        </Section>

                        {/* FOOTER */}
                        <Section className="bg-slate-50 px-10 py-6">

                            <Text className="m-0 text-center text-sm text-slate-500">
                                © {new Date().getFullYear()} ISCARSA.
                            </Text>

                            <Text className="mt-2 text-center text-sm text-slate-500">
                                Gracias por confiar en nosotros.
                            </Text>

                        </Section>

                    </Container>

                </Body>
            </Tailwind>
        </Html>
    );
}
import {
    Body,
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
    values: Record<string, string>;
}

export function ContactAdminEmail({
    values,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Nuevo mensaje recibido desde el formulario web
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
                                Nuevo mensaje de contacto
                            </Heading>

                            <Text className="mt-3 text-slate-300">
                                Se recibió una nueva solicitud desde el sitio web.
                            </Text>

                        </Section>

                        {/* CONTENT */}

                        <Section className="px-10 py-8">

                            <Heading className="m-0 text-xl text-slate-900">
                                Información enviada
                            </Heading>

                            <Text className="mt-2 text-slate-600">
                                Detalle completo del formulario.
                            </Text>

                            <Hr className="my-6 border-slate-200" />

                            <Section className="rounded-xl border border-slate-200 bg-slate-50 p-6">

                                <table
                                    width="100%"
                                    cellPadding="0"
                                    cellSpacing="0"
                                >
                                    <tbody>

                                        {Object.entries(values).map(
                                            ([key, value]) => (
                                                <tr key={key}>
                                                    <td
                                                        style={{
                                                            padding: "12px 0",
                                                            color: "#64748b",
                                                            textTransform: "capitalize",
                                                            width: "35%",
                                                        }}
                                                    >
                                                        {key.replaceAll("_", " ")}
                                                    </td>

                                                    <td
                                                        align="right"
                                                        style={{
                                                            padding: "12px 0",
                                                            color: "#0f172a",
                                                            fontWeight: 600,
                                                            width: "65%",
                                                        }}
                                                    >
                                                        {value}
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                    </tbody>
                                </table>

                            </Section>

                        </Section>

                        {/* FOOTER */}

                        <Section className="bg-slate-50 px-10 py-6">

                            <Text className="m-0 text-center text-sm text-slate-500">
                                Este correo fue generado automáticamente desde
                                el formulario de contacto de iscarsa.com.
                            </Text>

                        </Section>

                    </Container>

                </Body>
            </Tailwind>
        </Html>
    );
}
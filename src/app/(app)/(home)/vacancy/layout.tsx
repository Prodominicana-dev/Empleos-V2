import { notFound } from "next/navigation";

// Sección de vacantes oculta: /vacancy y /vacancy/[id] responden 404.
// Para volver a mostrarla, borrar este archivo y descomentar el enlace del footer.
export default function VacancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  notFound();
  return <>{children}</>;
}

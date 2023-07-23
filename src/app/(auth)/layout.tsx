import Image from "next/image";
import CurrentDate from "../components/CurrentDate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="divide-y-2 divide-dashed flex flex-col w-full">
        <Image
          className="relative w-full px-16 text-center block py-3"
          src="/todo.jpg"
          alt="Todo Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div>{children}</div>
    </div>
  );
}

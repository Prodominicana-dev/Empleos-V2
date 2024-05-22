import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Category } from "../(home)/categories";

export const HoverEffect = ({
  items,
  className,
}: {
  items: Category[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "flex flex-row flex-wrap justify-center gap-5  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/vacancy?cat=${item.name.toLowerCase()}`}
          key={item?.id}
          className="relative block w-[28rem] p-2 group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 z-20 block w-full h-full bg-neutral-50 dark:bg-slate-50/70 rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="font-dm-sans">
            <div className="flex items-center justify-center">
              {item.icon && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/category/cat/svg/${item?.icon}`}
                  alt={item?.name}
                  width={200}
                  height={200}
                  className="size-16 lg:size-24"
                />
              )}
            </div>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              {item._count.vacancies} vacantes disponibles
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white shadow-xl relative z-30 flex flex-col gap-2 items-center",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-black text-lg lg:text-xl font-bold tracking-wide mt-4 text-center",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-gray-500 tracking-wide leading-relaxed text-xs lg:text-sm text-center",
        className
      )}
    >
      {children}
    </p>
  );
};

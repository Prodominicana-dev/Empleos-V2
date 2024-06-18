"use client";

import type { CardProps } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  Autocomplete,
  AutocompleteItem,
  CardFooter,
  DatePicker,
  Checkbox,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { editUser, useUser } from "@/service/user/service";

export default function UserDataSkeleton() {
  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <p className="text-large">Detalles de la cuenta</p>
        <div className="flex gap-4 py-4">
          <Badge
            disableOutline
            classNames={{
              badge: "w-5 h-5",
            }}
            color="primary"
            content={
              <Button
                isIconOnly
                className="p-0 text-primary-foreground"
                radius="full"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:pen-2-linear" />
              </Button>
            }
            placement="bottom-right"
            shape="circle"
          >
            <Skeleton className="rounded-full h-14 w-14" />
          </Badge>
          <div className="flex flex-col items-start justify-center gap-3">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
        </div>
        <p className="text-small text-default-400">
          Esta foto podrá ser visible por los administradores de la plataforma.
        </p>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* First Name */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Username */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Email */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Celular */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Country */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Nationality */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* State */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Document type */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* State */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Nationality */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
          {/* Celular */}
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
            <Skeleton className="w-24 h-3 rounded-lg" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <Skeleton className="h-3 rounded-lg w-44" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

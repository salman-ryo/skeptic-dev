import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { todayDateUS } from "@/utils/dateTime";

type RequestMessageType = {
  email: string;
  message: string;
  name: string;
};

export default function AuthorRequest({
  email,
  message,
  name,
}: RequestMessageType) {
  return (
    <Html>
      <Head />
      <Preview>Author Request from {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-200 text-white w-full">
          <Container>
            <Section className="my-10 px-8 py-4 rounded-md text-pretty bg-slate-800">
              <Heading className="leading-tight text-xl text-start">
                {name}
              </Heading>
              <Text className="text-start text-lg">{email}</Text>
              <Text className="whitespace-pre-wrap">{message}</Text>
              <Hr />
              <Text className="text-start">Best of luck!</Text>
              <Text className="text-start">{name}</Text>
              <Text className="text-start">{todayDateUS()}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

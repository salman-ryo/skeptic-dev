import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

type OtpEmailProps = {
  otp: string;
  name?: string;
};

export default function OtpEmail({ otp, name }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP Code</Preview>
      <Tailwind>
        <Body className='bg-gray-200 text-white w-full'>
          <Container>
            <Section className='my-10 px-8 py-4 rounded-md text-pretty bg-slate-800'>
              <Heading className="text-2xl text-center">Your OTP Code</Heading>
              {name && <Text className="text-lg text-center">Hello {name},</Text>}
              <Text className="text-xl font-bold text-center">{otp}</Text>
              <Text className="text-sm text-center">
                This OTP is valid for 5 minutes. Please do not share it with anyone.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

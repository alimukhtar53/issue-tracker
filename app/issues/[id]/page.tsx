import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Badge from "@/app/components/Badge";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  console.log(issue);
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap={"3"} my={"2"}>
        <Badge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue?.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;

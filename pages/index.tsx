import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "@components/link";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import { getMarkdownContent } from "@utils/mdx";

export async function getStaticProps() {
  const { content: intro } = getMarkdownContent("intro");
  return {
    props: {
      intro,
    },
  };
}

interface IProps {
  intro: string;
}

function Home({ intro } : IProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        minHeight="50vh"
      >
        <Card sx={{ margin: "5%" }}>
          <CardContent sx={{ padding: "1%" }}>
            <Typography textAlign="center">
              <ReactMarkdown>{intro}</ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" justifyContent="center" minHeight="50vh">
        <Link href="blog/GameOfLife">Game Of Life</Link>
      </Box>
    </>
  );
}

export default Home;

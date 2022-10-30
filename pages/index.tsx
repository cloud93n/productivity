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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";

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

function Home({ intro }: IProps) {
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        minHeight="50vh"
      >
        <Box sx={{ bgcolor: "background.paper" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                href="blog/GameOfLife"
              >
                <ListItemText primary="Conway's Game Of Life" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component="a"
                href="https://todo-app-f6965.web.app"
              >
                <ListItemText primary="Todo List" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <Link href="blog/GameOfLife">Game Of Life</Link>
        <Link href="https://todo-app-f6965.web.app">Todo-List</Link> */}
        </Box>
      </Box>
    </>
  );
}

export default Home;

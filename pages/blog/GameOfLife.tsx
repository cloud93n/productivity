import { useEffect, useState } from "react";

import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Box from "@mui/material/Box";
import GridBoard from "@components/grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Header from "@components/header";

import {
  copyGrid,
  generateGrid,
  generateRandomGrid,
  getNextGen,
  GridSize,
} from "@utils/GameOfLife";

function GameOfLife() {
  const [gridSize, setGridSize] = useState<GridSize>({ rows: 20, cols: 30 });
  const [grid, setGrid] = useState(generateGrid(gridSize));
  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [randPopDenc, setRandPopDenc] = useState(50);

  function handleToggleTile(i: number, j: number) {
    let newGrid = copyGrid(grid);
    newGrid[i][j] = newGrid[i][j] ? 0 : 1;
    setGrid(newGrid);
  }

  function handleClear() {
    setGrid(generateGrid(gridSize));
    setGen(0);
  }

  useEffect(() => {
    handleClear();
  }, [gridSize]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setGrid((current) => {
        const nextGen = getNextGen(current);
        if (JSON.stringify(current) === JSON.stringify(nextGen)) {
          setRunning(false);
        }
        return getNextGen(current);
      });
      setGen((gen) => gen + 1);
    }, 1000 - speed * 10);

    return () => clearInterval(timer);
  }, [running, speed]);

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h1" align="center">
          Game Of Life
        </Typography>
        <Box display="flex" justifyContent="center" gap="20px">
          <Button variant="outlined" onClick={() => setRunning(!running)}>
            {running ? "Stop" : "Start"}
          </Button>
          <Button variant="outlined" onClick={handleClear} disabled={running}>
            Clear
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClear();
              setGrid(generateRandomGrid(gridSize, randPopDenc));
            }}
            disabled={running}
          >
            Random
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-around" minWidth="100vw">
          <Box display="flex" justifyContent="center" margin="1%" width="33%">
            <Typography variant="h5">Generation: {gen}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            margin="1%"
            width="33%"
          >
            <TextField
              id="Height"
              label="Height"
              type="number"
              defaultValue="20"
              value={gridSize.rows ? gridSize.rows : ""}
              onChange={(e) =>
                setGridSize({ ...gridSize, rows: +e.target.value })
              }
              placeholder="Height"
              disabled={running}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="Width"
              label="Width"
              type="number"
              defaultValue="30"
              value={gridSize.cols ? gridSize.cols : ""}
              onChange={(e) =>
                setGridSize({ ...gridSize, cols: +e.target.value })
              }
              placeholder="Width"
              disabled={running}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            margin="1%"
            width="33%"
            gap="5px"
          >
            <Box width="50%" margin="1%">
              <Typography id="speed-slider" gutterBottom>
                Speed : {speed}
              </Typography>
              <Slider
                defaultValue={50}
                aria-label="Default"
                // valueLabelDisplay="auto"
                value={speed}
                onChange={(e:any) => setSpeed(e.target.value)}
              />
            </Box>
            <Box width="50%" margin="1%">
              <Typography id="density-slider" gutterBottom>
                Density : {randPopDenc}
              </Typography>
              <Slider
                defaultValue={50}
                aria-label="Default"
                valueLabelDisplay="auto"
                value={randPopDenc}
                onChange={(event, newValue:any) => setRandPopDenc(newValue)}
                disabled={running}
              />
            </Box>
          </Box>
        </Box>
        <GridBoard grid={grid} onClick={handleToggleTile} />
      </Box>
    </>
  );
}

export default GameOfLife;

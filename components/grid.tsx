import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  grid: number[][];
  onClick: (i: number, j: number) => void;
}

export default function Grid({ grid, onClick }: Props) {
  return (
    <>
    <Box margin="1%" border = '1px black'>
      {grid.map((row, i) => {
        return (
          <Box display = 'flex' key={i}>
            {row.map((cell, j) => {
              return (
                <Box 
                  // component="span"
                  key={j}
                  onClick={() => onClick(i, j)}
                  sx={{
                    bgcolor: cell ? 'gray' : "white",
                    width: '30px',
                    height: '30px',
                    border: 1,
                    borderColor: 'gray',
                  }}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
    </>
  );
}

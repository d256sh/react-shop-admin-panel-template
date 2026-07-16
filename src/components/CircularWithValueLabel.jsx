import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={160}
        thickness={3.5}
        sx={{ color: "var(--border)" }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={160}
        thickness={3.5}
        sx={{
          color: "var(--accent)",
          position: "absolute",
          left: 0,
          [`& .MuiCircularProgress-circle`]: {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: 28,
            fontWeight: 750,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          {`${Math.round(value)}%`}
        </Box>
        <Box
          component="span"
          sx={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}
        >
          of target
        </Box>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;

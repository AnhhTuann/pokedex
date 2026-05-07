import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "./PokeDetail";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CompareModalProps {
  ids: number[];
  onClose: () => void;
}

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const theme = useTheme();
  const { data: d1 } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: ids[0] },
    skip: !ids[0],
  });
  const { data: d2 } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: ids[1] },
    skip: !ids[1],
  });

  if (ids.length < 2) return null;
  const p1 = d1?.pokemon;
  const p2 = d2?.pokemon;
  if (!p1 || !p2) return null;

  const chartData = p1.stats.map((s: any, i: number) => ({
    stat: s.name.replace("-", " ").toUpperCase(),
    [p1.name]: s.value,
    [p2.name]: p2.stats[i]?.value || 0,
    fullMark: 255,
  }));

  return (
    <Dialog
      open={ids.length === 2}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 900,
          letterSpacing: -0.5,
          px: 4,
          pt: 3,
        }}
      >
        ⚔️ Head-to-Head Comparison
        <IconButton
          onClick={onClose}
          sx={{ ml: "auto", color: "text.secondary" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          sx={{ alignItems: "center", py: 2 }}
        >
          {/* P1 */}
          <Stack sx={{ alignItems: "center", minWidth: 180 }} spacing={2}>
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                bgcolor: alpha("#6366f1", 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={p1.image}
                alt={p1.name}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  filter: "drop-shadow(0 6px 20px rgba(99,102,241,0.4))",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 950,
                textTransform: "capitalize",
                letterSpacing: -0.5,
              }}
              color="primary"
            >
              {p1.name}
            </Typography>
            <Stack
              direction="row"
              sx={{ gap: 1, flexWrap: "wrap", justifyContent: "center" }}
            >
              {p1.types.map((t: string) => (
                <Chip
                  key={t}
                  label={t}
                  size="medium"
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    bgcolor: alpha("#6366f1", 0.15),
                    textTransform: "uppercase",
                    px: 1,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* Radar Chart */}
          <Box sx={{ flex: 1, height: 380, width: "100%", minWidth: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid strokeOpacity={0.2} />
                <PolarAngleAxis
                  dataKey="stat"
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 255]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name={p1.name}
                  dataKey={p1.name}
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
                <Radar
                  name={p2.name}
                  dataKey={p2.name}
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.45}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    marginTop: 10,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* P2 */}
          <Stack sx={{ alignItems: "center", minWidth: 180 }} spacing={2}>
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                bgcolor: alpha("#ec4899", 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={p2.image}
                alt={p2.name}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  filter: "drop-shadow(0 6px 20px rgba(236,72,153,0.4))",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 950,
                textTransform: "capitalize",
                letterSpacing: -0.5,
              }}
              color="secondary"
            >
              {p2.name}
            </Typography>
            <Stack
              direction="row"
              sx={{ gap: 1, flexWrap: "wrap", justifyContent: "center" }}
            >
              {p2.types.map((t: string) => (
                <Chip
                  key={t}
                  label={t}
                  size="medium"
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    bgcolor: alpha("#ec4899", 0.15),
                    textTransform: "uppercase",
                    px: 1,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

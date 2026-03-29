import { Box, Typography } from "@mui/material";
import PosterMedia from "./PosterMedia";
import * as styles from "../styles/appStyles";

export default function GamePosterCard({
  title = "Game title",
  posterSrc,
  posterAlt,
  width = 230,
  height = 350,
  sx,
  onClick,
  showTitle = true,
  subtitle,
  developer,
  year,
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width,
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #d9deea",
          backgroundColor: "#edf1f8",
          position: "relative",
          transition: "transform 180ms ease, box-shadow 180ms ease",
          transformOrigin: "center",
          willChange: "transform",
          "&:hover": {
            transform: onClick ? "translateY(-3px)" : "none",
            boxShadow: onClick ? "0 14px 30px rgba(40, 59, 110, 0.12)" : "none",
          },
        }}
      >
        <PosterMedia
          title={title}
          posterSrc={posterSrc}
          posterAlt={posterAlt}
          wrapperSx={{ width: "100%", height: "100%" }}
          imageSx={styles.posterImageSx}
          placeholderLabel={title}
          placeholderSx={{
            ...styles.posterPlaceholderWrapSx,
            ...styles.posterPlaceholderInsetSx,
            px: 2,
          }}
          placeholderTextVariant="subtitle2"
          placeholderTextSx={{
            color: "#60708f",
            textAlign: "center",
            fontWeight: 700,
          }}
        />
      </Box>

      {showTitle && (
        <Box sx={{ pt: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" sx={{ color: "#697189", mt: 0.3 }}>
              {subtitle}
            </Typography>
          ) : null}
          {(developer || year) && (
            <Typography variant="body2" sx={{ color: "#697189", mt: 0.3 }}>
              {[developer, year].filter(Boolean).join(" · ")}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

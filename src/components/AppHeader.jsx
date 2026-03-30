<<<<<<< HEAD
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { NAV_ITEMS } from "../constants/homeContent";
import * as styles from "../styles/appStyles";

export default function AppHeader({ currentPage, onNavigate }) {
  const activeKey = currentPage === "game" ? "discover" : currentPage;
=======
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { SUPPORTED_LANGUAGES } from '../constants/i18n';
import * as styles from '../styles/appStyles';

export default function AppHeader({
  currentPage,
  onNavigate,
  language,
  onChangeLanguage,
  tr,
}) {
  const activeKey = currentPage === 'game' ? 'discover' : currentPage;
>>>>>>> Macintosh

  const navItems = [
    { key: 'home', label: tr('nav.home') },
    { key: 'discover', label: tr('nav.discover') },
    { key: 'library', label: tr('nav.library') },
    { key: 'profile', label: tr('nav.profile') },
  ];

  return (
    <AppBar position="static" sx={styles.headerBarSx}>
      <Toolbar sx={styles.toolbarSx}>
        <Stack
          direction="row"
          spacing={0}
          sx={{ cursor: "pointer" }}
          onClick={() => onNavigate("home")}
          aria-label="Go to home page"
        >
          <Typography variant="h2" sx={{ color: "#000", fontWeight: 800 }}>
            Game
          </Typography>
          <Typography variant="h2" sx={{ color: "#40559A", fontWeight: 800 }}>
            Shelf
          </Typography>
        </Stack>

<<<<<<< HEAD
        <Stack direction="row" spacing={{ xs: 3, md: 6 }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={`nav-item-${item.key}`}
              disableRipple
              onClick={() => onNavigate(item.key)}
              sx={{
                ...styles.navButtonBaseSx,
                ...(activeKey === item.key
                  ? styles.navButtonActiveSx
                  : styles.navButtonDefaultSx),
              }}
            >
              {item.label}
            </Button>
          ))}
=======
        <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Stack direction="row" spacing={{ xs: 2, md: 4 }}>
            {navItems.map((item) => (
              <Button
                key={`nav-item-${item.key}`}
                disableRipple
                onClick={() => onNavigate(item.key)}
                sx={{
                  ...styles.navButtonBaseSx,
                  ...(activeKey === item.key
                    ? styles.navButtonActiveSx
                    : styles.navButtonDefaultSx),
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              border: '1px solid #d8deea',
              borderRadius: '999px',
              p: 0.5,
              backgroundColor: '#fff',
            }}
          >
            {SUPPORTED_LANGUAGES.map((item) => (
              <Button
                key={`lang-${item.key}`}
                size="small"
                onClick={() => onChangeLanguage(item.key)}
                sx={{
                  minWidth: 44,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: '999px',
                  fontWeight: 700,
                  color: language === item.key ? '#fff' : '#40559A',
                  backgroundColor: language === item.key ? '#40559A' : 'transparent',
                  '&:hover': {
                    backgroundColor: language === item.key ? '#364985' : '#f2f5fb',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
>>>>>>> Macintosh
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

import { Box, Grid, IconButton, Typography } from "@mui/material";
import Container from "react-bootstrap/Container";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState } from "react";

// Footer Logo----------
import FooterLogo from "../../Images/Universal/footer-logo-white.png"
import Begambleaware from "../../Images/Universal/begambleaware.webp"


// Social Icons---------
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const SocialIcon = ({ icon, link, hoverColor }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link
      to={link}
      target="_blank"
      className="px-2"
      style={{ color: "inherit", display: "inline-block" }}
    >
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: hovered ? hoverColor : "inherit",
          transition: "color 0.3s",
        }}
      >
        {icon}
      </span>
    </Link>
  );
};

const Footer = () => {
  const NavigationMenu = [
    { menuName: "View All Betting Sites", link: "/cricket" },
    { menuName: "Today Match Prediction", link: "/sports" },
    { menuName: "T20 Cricket Prediction", link: "/web-stories" },
    { menuName: "Cricket Betting Odds", link: "/bollywood" },
    { menuName: "Live Score", link: "/business" },
    { menuName: "How to Bet", link: "/e-games" },
  ];
  const FollowUsOnList = [
    {
      title: "Facebook",
      icon: <FacebookRoundedIcon fontSize="large" />,
      link: "https://www.facebook.com/armaniexch247news",
      hoverColor: "#3b5998", // Facebook blue
    },
    {
      title: "Twitter",
      icon: <TwitterIcon fontSize="large" />,
      link: "https://twitter.com/Armaniex247News",
      hoverColor: "#1da1f2", // Twitter blue
    },
    {
      title: "Instagram",
      icon: <InstagramIcon fontSize="large" />,
      link: "https://www.instagram.com/armaniexch247news/",
      hoverColor: "#c13584", // Instagram pink
    },
    {
      title: "Youtube",
      icon: <YouTubeIcon fontSize="large" />,
      link: "https://www.youtube.com/channel/UCcQpD_qoFbi0EixcKvYlz6Q",
      hoverColor: "#ff0000", // YouTube red
    },
    {
      title: "Whatsapp",
      icon: <WhatsAppIcon fontSize="large" />,
      link: "https://wa.link/j1mbds",
      hoverColor: "#25d366", // WhatsApp green
    },
  ];
  return (
    <>
      {/* Main Footer--------- */}
      <Box component="footer" className="footer-wrapper pt-5 pb-4">
        <Container>
          <Grid container className="zIndex-1 justify-between gap-lg-1 gap-5">
            <Grid item lg={3.2} xs={12} className="text-lg-start text-center">
              <Box className="footer-logo-wrapper mx-lg-0 mx-auto">
                <Link to="https://armaniexch247news.com/">
                  <img src={FooterLogo} alt="footer logo" />
                </Link>
              </Box>
              <Typography variant="h3" className="mt-lg-4 mt-5">
                {" "}
                <span className="">FOLLOW US</span>
              </Typography>
              <Box className="social-icons-wrapper mt-3">
                {FollowUsOnList.map((socialIcon, ind) => (
                  <SocialIcon
                    key={ind}
                    icon={socialIcon.icon}
                    link={socialIcon.link}
                    hoverColor={socialIcon.hoverColor}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item lg={5.3} xs={12}>
              <Typography variant="h2" className="mb-md-4 mb-3">
                <span className="">Disclaimer</span>
              </Typography>

              <Typography
                variant="p"
                component="p"
                gutterBottom
                className="footer-menu mb-3"
              >
                Cricketbettingtips.org is not a bookmaker but an individual website offering research based reviews, news and information on top boomakers. We, at Cricketbetting.net, do not have ownership with any of the bookmakers listed by us. We only provide guide and information to Cricket betting sites and their services. READ THE DISCLAIMER
              </Typography>
            </Grid>
            <Grid item lg={2.7} xs={12}>
              <Typography variant="h2" className="mb-md-4 mb-3">
                <span className="">Navigation</span>
              </Typography>
              {NavigationMenu.map((val, ind) => {
                return (
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                    key={ind}
                    className="footer-menu mb-3"
                  >
                    <ArrowForwardIosSharpIcon
                      style={{
                        // color: "#fff",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    />{" "}
                    <Link
                      to={`https://armaniexch247news.com${val.link}`}
                      className="text-white"
                    >
                      {val.menuName}
                    </Link>
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Bottom Footer---------- */}
      <Box component="footer" className="bottom-footer py-4">
        <Container className="py-2">
          <Grid container className="zIndex-1 justify-between gap-md-2 gap-4">
            <Grid item lg={3.2} sm={4} xs={12}>
              <Box className="footer-logo-wrapper mx-sm-0 mx-auto">
                <Link to="https://armaniexch247news.com/">
                  <img src={Begambleaware} alt="footer logo" />
                </Link>
              </Box>
            </Grid>
            <Grid item lg={6.5} sm={7.5} xs={12}>
              <Typography variant="h4" className="text-sm-end text-center">© 2024 CricketBettingTips.org. All rights reserved. </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

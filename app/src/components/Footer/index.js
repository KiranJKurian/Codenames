import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GitHubIcon from '@material-ui/icons/GitHub';
import styled from 'styled-components';
import { Link } from '@material-ui/core';

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;

  padding-left: ${props => props.theme.spacing(4)}px;
  padding-right: ${props => props.theme.spacing(4)}px;

  @media (min-width: 768px) {
    padding-left: ${props => props.theme.spacing(8)}px;
    padding-right: ${props => props.theme.spacing(8)}px;
  }
`;

const Container = styled.div`
  display: flex;
`;

const HeartIcon = styled(FavoriteBorderIcon)`
  color: pink;
  padding: ${props => props.theme.spacing(0.5)}px;
`;

const ColoredGithubIcon = styled(GitHubIcon)`
  color: white;
`;

export default () => (
  <Footer>
    <Container>
      Made with <HeartIcon /> by KiranJKurian
    </Container>
    <Link href="https://github.com/KiranJKurian/Codenames">
      <ColoredGithubIcon />
    </Link>
  </Footer>
);

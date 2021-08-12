import { FC, Fragment, useEffect, useState } from 'react';
import { Box, Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Header } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxBody: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 80,
      minHeight: 'calc(100vh - 155px)',
    },
  })
);

const Layout: FC<LayoutProps> = ({ children, fullCover }) => {
  const classes = useStyles();
  const [cover, setCover] = useState(false);
  
  useEffect(() => {
    setCover(fullCover);
  }, [fullCover]);

  return (
    <Fragment>
      <Header />
      <Box className={!cover ? classes.boxBody : ''}>
        <Container maxWidth={cover ? false : 'lg'} disableGutters={cover && true}>
          {children}
        </Container>
      </Box>
    </Fragment>
  );
};

export default Layout;

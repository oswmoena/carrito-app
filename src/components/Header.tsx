import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Theme,
} from "@material-ui/core";
import { AppBar, Container, createStyles, makeStyles } from "@material-ui/core";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { CartContext } from "../context/CartContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    customAppBar: {
      background: "#103047",
      boxShadow: "none",
      width: "100%",
    },
    customToolbar: {
      minHeight: 80,
      padding: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    button: {
      color: "#FFFFFF",
      width: "15%",
      "& :hover": {
        color: "#E87C30",
        transition: "0.5s",
      },
    },
    cart: {
      marginLeft: 0,
      "& :hover": {
        cursor: "pointer",
      },
    },
    numberCircle: {
      borderRadius: "10%",
      padding: "1px 3.5px",
      background: "#e00842",
      // border: '2px solid #666',
      color: "#FFFFFF",
      textAlign: "center",
      font: "16px Arial, sans-serif",
    },
  })
);

export const Header = () => {
  const classes = useStyles();
  const { items } = useContext(CartContext);

  const { products } = items;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const showProductQuantity = (product: IProductBag) => {
    return <Fragment></Fragment>;
  };

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.customAppBar}>
        <Container>
          <Toolbar className={classes.customToolbar}>
            <Button className={classes.button} component={Link} to="/">
              {"Home"}
            </Button>
            <Button
              className={classes.button}
              onClick={() => console.log("asd")}
            >
              {"dos"}
            </Button>
            <Button className={classes.button} component={Link} to="/about-us">
              {"Sobre Nosotros"}
            </Button>
            <small
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className={classes.cart}
            >
              <ShoppingCartOutlinedIcon />
              {products.length > 0 && (
                <small className={classes.numberCircle}>
                  {products.length}
                </small>
              )}
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          {products.length > 0 &&
                            products.map((product: IProductBag, index) => (
                              <MenuItem key={index}>
                                {product.name}
                                {
                                  <div style={{ padding: "0 20px", alignItems: 'center' }}>
                                    <AddIcon />
                                    {product.quantity}
                                    <RemoveIcon />
                                  </div>
                                }
                              </MenuItem>
                            ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </small>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

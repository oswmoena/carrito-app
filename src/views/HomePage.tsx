import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { productList } from '../constants/products';
import notFound from '../assets/img/notFound.jpeg';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    '& .MuiCardMedia-root': {
      backgroundSize: 'contain',
    },
  },
  media: {
    height: 160,
  },
  container: {
    overflow: 'auto',
    paddingTop: '4%',
  },
});

export const HomePage = () => {
  const classes = useStyles();
  const { items, setItems } = useContext(CartContext);
  const { products } = items;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const handleAddCart = (product: IProduct) => {
    setItems({ products: [...products, product] });
  };

  return productList.length > 0 ? (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        {productList.map((product, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={notFound} title="Contemplative Reptile" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Detalles
                </Button>
                <Button size="small" color="primary" onClick={() => handleAddCart(product)}>
                  <AddShoppingCartIcon />
                </Button>
                <Typography gutterBottom variant="h5" component="h4">
                  {/* ${product.price} */}
                  {formatter.format(product.price).replace(',', '.')}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <Typography gutterBottom variant="h5" component="h2">
      Sin datos disponibles
    </Typography>
  );
};

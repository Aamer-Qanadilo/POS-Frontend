import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ProductContext } from "../../Contexts/ProductContext";
import { formatCurrency } from "../../utils/formatCurrency";

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4",
];

type Props = {};

const card = {
  image:
    "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg",
  name: "Nature Around Us",
  description:
    "We are going to learn different kinds of species in nature that live together to form amazing environment.",
};
const ProductCard = (props: Props) => {
  const { products, productImageBaseUrl } = React.useContext(ProductContext);

  const [cards, setCards] = React.useState([card, card, card, card]);

  return (
    <div
      className="root"
      style={{
        display: "flex",
        justifyContent: "initial",
      }}
    >
      <Grid container spacing={4}>
        {products.map((product, index) => {
          const {
            image,
            name,
            price,
            unitOfMeasure: { name: unitOfMeasureName },
          } = product;
          return (
            <Grid item>
              <Card
                key={index}
                sx={{
                  width: 200,
                  transition: "0.3s",
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                  padding: "30px 20px",
                }}
              >
                <Box
                  component={"div"}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px 0",
                    border: "1px dotted black",
                    borderRadius: "5px",
                  }}
                >
                  <Avatar
                    variant={"rounded"}
                    alt="The image"
                    src={productImageBaseUrl + image}
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: "10px 15px",
                  }}
                >
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"subtitle1"}
                    gutterBottom
                    sx={{
                      maxWidth: "20ch",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontWeight: "bold",
                      margin: "20px 0 10px",
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"subtitle2"}
                    color="Highlight"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatCurrency(price) + " / " + unitOfMeasureName}
                  </Typography>
                </CardContent>
                <Divider
                  variant="middle"
                  sx={{
                    margin: `20px 0`,
                  }}
                  light
                  flexItem
                />
                <CardActions>
                  <Button fullWidth variant="contained">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProductCard;

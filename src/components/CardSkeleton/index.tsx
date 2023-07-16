import React from "react";

import { Grid, Card, Box, CardContent } from "@mui/material";
import Skeleton from "react-loading-skeleton";

type Props = {
  cards: number;
};

const CardSkeleton = ({ cards }: Props) => {
  return (
    <React.Fragment>
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid
              key={index}
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              sx={{ minHeight: "393.275px" }}
            >
              <Card
                // key={index}
                className="cashier-product-card"
                sx={{
                  padding: "30px 20px 0",
                  minHeight: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  component="div"
                  className="cashier-product-card__image-container"
                  sx={{ marginBottom: "1.5rem" }}
                >
                  <Skeleton
                    circle
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  />
                </Box>
                <Skeleton count={2} style={{ margin: "1rem auto " }} />
                <Skeleton />
              </Card>
            </Grid>
          );
        })}
    </React.Fragment>
  );
};

export default CardSkeleton;

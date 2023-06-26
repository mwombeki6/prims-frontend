"use client";

import React, { useState } from "react";
import { Grid, Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import { UploadInnovation } from "./upload";
import { Innovations } from "./innovations";

const child = <Skeleton height={140} radius="md" animate={true} />;

export const InnovationContainer = () => {
  const [innovation, setInnovation] = useState(null);

  if (innovation) {
    return (
      <div>
        <Grid>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={3}>{child}</Grid.Col>
          <Grid.Col xs={3}>{child}</Grid.Col>
          <Grid.Col xs={6}>{child}</Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={3}>{child}</Grid.Col>
          <Grid.Col xs={3}>{child}</Grid.Col>
          <Grid.Col xs={6}>{child}</Grid.Col>
        </Grid>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="nav-bar"
    >
      <div></div>
      <div className="flex-col my-5">
        <Grid>
          <Grid.Col>
            <UploadInnovation />
          </Grid.Col>
          <Grid.Col>
            <Innovations title={""} description={""} stats={[]} image={undefined} />
          </Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={2}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={4}>{child}</Grid.Col>
          <Grid.Col xs={8}>{child}</Grid.Col>
          <Grid.Col xs={2}>{child}</Grid.Col>
        </Grid>
      </div>
    </motion.div>
  );
};

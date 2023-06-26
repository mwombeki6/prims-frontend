"use client";

import React, { useEffect, useState } from "react";
import { Card, Grid, Skeleton } from "@mantine/core";
import { useAppSelector } from "@/app/hooks";
import { studentDashboard } from "@/clients/studentClient";
import { motion } from "framer-motion";
import { TaskCard } from "./card";
import { StatsGrid } from "./stats";
import { redirect, useRouter } from "next/navigation";

const child = <Skeleton height={140} radius="md" animate={true} />;

const ContainerDash = () => {
  const { isStudentRegistered, student } = useAppSelector(
    (state) => state.student
  );
  const { isStaffAuthenticated } = useAppSelector((state) => state.staff);

  const currentUser = useAppSelector((state) => state.student);

  const [userData, setUserData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    studentDashboard()
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!isStudentRegistered) {
    router.replace('login')
  }



  if (!userData) {
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
      {/** <Grid>
        <Grid.Col xs={4}>
          {child}
          <h2>Welcome</h2>
          <a>{userData.user.first_name}</a> <a>{userData.user.last_name}</a>
        </Grid.Col>
        <Grid.Col xs={8}>
          {child}
          <p>Email: {userData.user.email}</p>
        </Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid> */}
      <div>
        <h1 className=" text-opacity-800 text-3xl font-sans font-medium  dark:text-white">
          Welcome, {userData.username}
        </h1>
      </div>

      <div className="flex-col">
        <Grid my={10}>
          <Grid.Col>
            <StatsGrid />
          </Grid.Col>

          <Grid.Col xs={4.5}></Grid.Col>
          <Grid.Col xs={8}></Grid.Col>
          <Grid.Col xs={8}></Grid.Col>
          <Grid.Col xs={4}></Grid.Col>
          <Grid.Col xs={3}></Grid.Col>
          <Grid.Col xs={3}></Grid.Col>
          <Grid.Col xs={6}></Grid.Col>
        </Grid>

        <Grid>
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

export default ContainerDash;

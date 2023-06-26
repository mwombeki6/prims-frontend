"use client";

import React, { useEffect } from "react";

import NextLink from "next/link";
import SignUpModal from "../modal/signUp";
import DarkMode from "../ui/darkMode";
import { StaffDrop } from "../ui/staffDrop";
import {
    createStyles,
    Header,
    Group,
    Button,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
} from "@tabler/icons-react";
import { useAppSelector } from "@/app/hooks";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Searchbutton } from "./searchicon";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: rem(42),
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: "Open source",
        description: "This Pokémon’s cry is very loud and distracting",
    },
    {
        icon: IconCoin,
        title: "Free for everyone",
        description: "The fluid of Smeargle’s tail secretions changes",
    },
    {
        icon: IconBook,
        title: "Documentation",
        description: "Yanma is capable of seeing 360 degrees without",
    },
    {
        icon: IconFingerprint,
        title: "Security",
        description: "The shell’s rounded shape and the grooves on its.",
    },
    {
        icon: IconChartPie3,
        title: "Analytics",
        description: "This Pokémon uses its flying ability to quickly chase",
    },
    {
        icon: IconNotification,
        title: "Notifications",
        description: "Combusken battles with the intensely hot flames it spews",
    },
];

export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    const { isStudentAuthenticated } = useAppSelector((state) => state.student);
    const { isStaffAuthenticated } = useAppSelector((state) => state.staff);
    const router = useRouter();

    const guestLinks = (
        <Group>
            <NextLink href={"/login"}>
                <Button variant="default">Log in</Button>
            </NextLink>

            <SignUpModal />
            <DarkMode />
        </Group>
    );

    const authLinks = (
        <Group>
            <NextLink href={"/staff-dashboard"}>
                <Button variant="default">Dashboard</Button>
            </NextLink>

            <StaffDrop />
            <DarkMode />
        </Group>
    );

    /*useEffect(() => {
      if (!isStudentAuthenticated) {
        router.push("/login");
      }
    }, [isStudentAuthenticated, router]);*/

    return (
        <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.75,
            }}
            className="nav-bar"
        >
            <Box pb={120}>
                <Header height={60} pos={"fixed"} px="md">
                    <Group position="apart" sx={{ height: "100%" }}>
                        <Title order={3}>PRIMS</Title>
                        {/** Center Top */}
                        <Group
                            sx={{ height: "100%" }}
                            spacing={0}
                            className={classes.hiddenMobile}
                        >
                            <Searchbutton />
                        </Group>
                        {/** Right Top (auth) */}
                        <Group className={classes.hiddenMobile}>


                            {isStaffAuthenticated ? authLinks : guestLinks}
                        </Group>
                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            className={classes.hiddenDesktop}
                        />
                    </Group>
                </Header>

                {/** Mobile Menu */}
                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Navigation"
                    className={classes.hiddenDesktop}
                    zIndex={1000000}
                >
                    <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                        <Divider
                            my="sm"
                            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                        />

                        <a href="#" className={classes.link}>
                            Home
                        </a>
                        <UnstyledButton className={classes.link} onClick={toggleLinks}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Features
                                </Box>
                                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksOpened}>{links}</Collapse>
                        <a href="#" className={classes.link}>
                            Learn
                        </a>
                        <a href="#" className={classes.link}>
                            Academy
                        </a>

                        <Divider
                            my="sm"
                            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                        />

                        <Group position="center" grow pb="xl" px="md">
                            <Button variant="default">Log in</Button>
                            <Button>Sign up</Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </motion.div>
    );
}

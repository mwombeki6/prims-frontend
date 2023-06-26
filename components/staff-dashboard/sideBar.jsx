"use client";

import {
    createStyles,
    Navbar,
    TextInput,
    Code,
    UnstyledButton,
    Badge,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    rem,
    Menu,
    Title,
    ScrollArea,
} from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconSearch,
    IconPlus,
    IconSelector,
    IconHome2,
    IconListSearch,
} from "@tabler/icons-react";
import { UserButton } from "../ui/UserButton";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { staffDashboard } from "@/clients/staffClient";
import Link from "next/link";

const cookies = new Cookies();

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
    },

    section: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        marginBottom: theme.spacing.md,

        "&:not(:last-of-type)": {
            borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
                }`,
        },
    },

    searchCode: {
        fontWeight: 700,
        fontSize: rem(10),
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
            }`,
    },

    mainLinks: {
        paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingBottom: theme.spacing.md,
    },

    mainLink: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        fontSize: theme.fontSizes.xs,
        padding: `${rem(8)} ${theme.spacing.xs}`,
        borderRadius: theme.radius.sm,
        fontWeight: 600,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    mainLinkInner: {
        display: "flex",
        alignItems: "center",
        flex: 1,
    },

    mainLinkIcon: {
        marginRight: theme.spacing.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
    },

    mainLinkBadge: {
        padding: 0,
        width: rem(20),
        height: rem(20),
        pointerEvents: "none",
    },

    collections: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingBottom: theme.spacing.md,
    },

    collectionsHeader: {
        paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
        paddingRight: theme.spacing.md,
        marginBottom: rem(5),
    },

    collectionLink: {
        display: "block",
        padding: `${rem(8)} ${theme.spacing.xs}`,
        textDecoration: "none",
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.xs,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        lineHeight: 1,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },
}));

const links = [
    { icon: IconHome2, label: "Home || Dashboard", notifications: 3, route: "/" },
    {
        icon: IconCheckbox,
        label: "Publications",
        notifications: 4,
        route: "/publication",
    },
    { icon: IconUser, label: "Research", route: "/login" },
    { icon: IconBulb, label: "Innovations" },
];

const collections = [
    { emoji: "👍", label: "Pass" },

    { emoji: "✨", label: "Reports" },

    { emoji: "📅", label: "Events" },
];

export function SideBar() {
    const { classes } = useStyles();

    const collectionLinks = collections.map((collection) => (
        <a
            href="/"
            onClick={(event) => event.preventDefault()}
            key={collection.label}
            className={classes.collectionLink}
        >
            <span style={{ marginRight: rem(9), fontSize: rem(25) }}>
                {collection.emoji}
            </span>{" "}
            {collection.label}
        </a>
    ));


    const [userData, setUserData] = useState({});

    useEffect(() => {
        staffDashboard()
            .then((data) => setUserData(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <Navbar pos={"fixed"} p="md">
                    <Navbar.Section className={classes.section}>
                        <UserButton
                            image="https://i.imgur.com/fGxgcDF.png"
                            name={userData.email}
                            email="owner"
                            icon={<IconSelector size="0.9rem" stroke={1.5} />}
                        />
                    </Navbar.Section>

                    <TextInput
                        placeholder="Search"
                        size="sm"
                        icon={<IconSearch size="0.8rem" stroke={1.5} />}
                        rightSectionWidth={70}
                        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                        styles={{ rightSection: { pointerEvents: "none" } }}
                        mb="sm"
                    />
                    <Navbar.Section grow component={ScrollArea} mx="-lg" px="sm">
                        {" "}
                        <Navbar.Section className={classes.section}>
                            <div className="-space-y-1">
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconHome2
                                                    //color="orange"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Home || Dashboard</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard/publication"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconCheckbox
                                                    //color="blue"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Publications</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard/research"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconListSearch
                                                    //color="blue"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Research</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard/innovation"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconBulb
                                                    //color="blue"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Innovation</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                            </div>
                        </Navbar.Section>

                        <Navbar.Section className={classes.section}>

                            <Group className={classes.collectionsHeader} position="apart">
                                <Text size="xs" weight={500} color="dimmed">
                                    Account
                                </Text>
                                <Tooltip label="Create collection" withArrow position="right">
                                    <ActionIcon variant="default" size={18}>
                                        <IconPlus size="0.8rem" stroke={1.5} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                            <div className="-space-y-5">
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard/profile"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconBulb
                                                    //color="blue"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Profile</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                                <div className={classes.mainLinks}>
                                    <Link href={"/staff-dashboard/account-settings"}>
                                        <UnstyledButton className={classes.mainLink}>
                                            <div className={classes.mainLinkInner}>
                                                <IconBulb
                                                    //color="blue"
                                                    className={classes.mainLinkIcon}
                                                    size={25}
                                                    stroke={1.5}
                                                />

                                                <span>Settings</span>
                                            </div>
                                        </UnstyledButton>
                                    </Link>
                                </div>
                            </div>
                        </Navbar.Section>

                    </Navbar.Section>
                </Navbar>
            </div>
        </aside>
    );
}

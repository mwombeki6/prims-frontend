"use client";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Modal,
  Button,
  Avatar,
  Text,
  UnstyledButton,
  Group,
  rem,
  createStyles,
  Paper,
  Space
} from "@mantine/core";
import NextLink from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";


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


export function Searchbutton() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);
  const [data, setData] = useState([])

  const [searchQuery, setSearchQuery] = useState('');

  const debounce = useDebounce(searchQuery, 500)

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        params: {
          search: searchQuery, // Pass the search query as a parameter
        },
      });
      const searchResults = response.data;
      console.log(searchResults)
      setData(searchResults)
      // Handle the search results
    } catch (error) {
      // Handle the error
      console.log(error)
    }
  };

  const handleSearch = () => {
    fetchSearchResults(searchQuery);
  };

  useEffect(() => {
    fetchSearchResults
  }, [debounce])

  return (
    <div>
      <Modal opened={opened} onClose={close} size='auto' radius={'lg'}>
        <TextInput
          onInput={handleSearch}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"

          placeholder="Search users.."
          rightSectionWidth={42}
       
        />
        <Space h={20}/>
        <Paper withBorder shadow={'lg'}>
          <ul>
            {data && data.map(el => <li key={el.id}>

              <NextLink href={`/${encodeURIComponent(el.username)}`}>
                <UnstyledButton className={classes.mainLink}>
                  <Group>
                    <Avatar size={40} src={''} radius={40} />
                    <div>
                      <Text fz="sm" fw={900} color="white">
                        {el.first_name} {el.last_name}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        @{el.username}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </NextLink>

            </li>)}
          </ul>
        </Paper>

      </Modal>
      <Button leftIcon={<IconSearch size="1.1rem" stroke={1.5} />} onClick={open} variant="outline" radius={'xl'}>Search PRIMS</Button>




    </div>


  );
}

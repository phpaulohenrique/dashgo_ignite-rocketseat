import { Box, Button, Checkbox, Flex, Heading, HStack, Icon, IconButton, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { RepeatIcon } from "@chakra-ui/icons";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import {useState} from 'react'
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";


export default function UserList({users}){
    const [page, setPage] = useState(1)
    console.log(page)

    const {data, isLoading, isFetching, error, refetch} = useUsers(page, {
        initialData: users,
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    async function handlePrefetchUser(userId: string){
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10 //10 min
        })
    }



    return (
        <Box>
            <Header />

            <Flex
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px={["3", "4", "8"]}
            >
                <Sidebar />

                <Box
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    px={["3", "6", "8"]}
                    py={["8", "10"]}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && (
                                <Spinner size="sm" color="gray.500" ml="4" />
                            )}
                        </Heading>

                        <HStack spacing="4">
                            <IconButton
                                colorScheme="green"
                                aria-label="Atualizar dados"
                                size="sm"
                                icon={<RepeatIcon />}
                                title="Atualizar dados"
                                onClick={() => refetch()}
                            />
                            <NextLink href="users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={
                                        <Icon as={RiAddLine} fontSize="20" />
                                    }
                                >
                                    Criar novo
                                </Button>
                            </NextLink>
                        </HStack>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th
                                            px={["0", "8"]}
                                            color="gray.300"
                                            w={["0", "6"]}
                                        >
                                            <Checkbox colorScheme="pink"></Checkbox>
                                        </Th>
                                        <Th w="auto">Usuário</Th>
                                        {isWideVersion && (
                                            <Th>Data de cadastro</Th>
                                        )}
                                        <Th w="2"></Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data?.users?.map((user) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td
                                                    px={["0", "8"]}
                                                    color="gray.300"
                                                    w={["0", "6"]}
                                                >
                                                    <Checkbox colorScheme="pink"></Checkbox>
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link
                                                            color="purple.100"
                                                            href="/"
                                                            onMouseEnter={
                                                                () => handlePrefetchUser(user.id)
                                                            }
                                                        >
                                                            <Text fontWeight="bold">
                                                                {user.name}
                                                            </Text>
                                                        </Link>
                                                        <Text
                                                            fontSize="sm"
                                                            color="gray.400"
                                                        >
                                                            {user.email}
                                                        </Text>
                                                    </Box>
                                                </Td>

                                                {isWideVersion && (
                                                    <Td>{user.createdAt}</Td>
                                                )}

                                                <Td>
                                                    <IconButton
                                                        as="a"
                                                        aria-label="Editar"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        // alignItems="center"

                                                        // leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                    >
                                                        <Icon
                                                            as={RiPencilLine}
                                                        />
                                                        {/* Editar */}
                                                        {/* <Icon as={RiPencilLine} fontSize="20" /> */}
                                                    </IconButton>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}



// WITH MIRAGE THIS DONT WORK
// export const getServerSideProps: GetServerSideProps = async () => {

//     const {users, totalCount} = await getUsers(1)

//     return{
//         props:{
//             users
//         }
//     }
// }
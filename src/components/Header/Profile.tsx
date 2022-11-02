import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Paulo Henrique</Text>
                    <Text color="gray.300" fontSize="small">
                        paulo.henrique1080p@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar
                size="md"
                name="Paulo Henrique"
                src="https://github.com/phpaulohenrique.png"
            ></Avatar>
        </Flex>
    );
}
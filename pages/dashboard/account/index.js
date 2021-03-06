import { useState, useCallback } from 'react'
import Head from "next/head"
import { Header } from "@/components/Dashboard/Layout"
import { Avatar, Badge, Blockquote, Box, Button, Grid, Group, Image, Input, Stack, Table, Tabs, Text, Textarea, TextInput, ThemeIcon, Title, useMantineTheme } from "@mantine/core"
import { Message, Message2 } from "tabler-icons-react"
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { ValidateSchema } from '@/shared/constants'
import { fetcher } from '@/lib/fetch'
import { notif } from '@/lib/notification'
import { useUser } from '@/lib/users'
import { DropArea } from '@/components/Dashboard/Upload'
import { Image as NextImage } from 'next/image'
import { imageKitLoader } from '@/lib/imageLoader'



const AccountPage = ({ user }) => {

    const [loading, setLoading] = useState(false)
    const [avatarFile, setAvatarFile] = useState()
    const [edit, setEdit] = useState(false)
    const [editAvatar, setEditAvatar] = useState(false)
    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Index", href: "#" },
    ]




    const schema = z.object({
        id: ValidateSchema.user.id,
        name: ValidateSchema.user.name,
        bio: ValidateSchema.user.bio,
    })

    const profileForm = useForm({
        schema: zodResolver(schema),
        initialValues: {
            id: user.id,
            name: user.name,
            bio: user.bio || ""
        }
    })


    const { user: userData, isLoading, mutate } = useUser(user.id)

    const handleSubmit = async (payload) => {
        setLoading(true)
        try {
            const resp = await fetcher("/api/users", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            notif(true, "Data updated")
            setEdit(false)
            mutate()
        } catch (error) {
            if (Array.isArray(error)) {
                error.forEach(({ fields, message: errorMessage }) => {
                    notif(false, `Field ${fields.join()}`, errorMessage)
                })
            } else {
                notif(false, `User`, error)
            }
        }

        setLoading(false)
    }

    const schemaPassword = z.object({
        oldPassword: ValidateSchema.user.password,
        newPassword: ValidateSchema.user.password,
        confirmPassword: ValidateSchema.user.confirmPassword


    }).refine((data) =>
        data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    }
    )

    const passwordForm = useForm({
        schema: zodResolver(schemaPassword),
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    })


    const handleSubmitPassword = async (payload) => {
        setLoading(true)
        try {
            const resp = await fetcher("/api/auth/password/update", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...payload, email: userData.email })
            })

            notif(true, "Password updated")
            setEdit(false)
            passwordForm.reset()
            mutate()
        } catch (error) {
            if (Array.isArray(error)) {
                error.forEach(({ fields, message: errorMessage }) => {
                    notif(false, `Field ${fields.join()}`, errorMessage)
                })
            } else {
                notif(false, `Password`, error)
            }
        }

        setLoading(false)
    }

    const onDrop = useCallback(acceptedFiles => {
        console.log("test")
        // Do something with the files
        setAvatarFile(acceptedFiles[0])
        console.log(acceptedFiles[0])
    }, [])


    const onUpdateAvatar = async () => {
        setLoading(true)

        if(!avatarFile){
            notif(false,"file not found")
            return
        }

        
       
        try {
            const formData = new FormData();
        
            const userId = userData.id
            formData.append('avatar',avatarFile,avatarFile.name)
            formData.append('userId',userId)
            const resp = await fetcher("/api/upload/avatar",{
                method: "POST",
                body: formData
            })
            setEditAvatar(false)
            notif(true,"Avatar updated")
            mutate()
        } catch (error) {
            if (Array.isArray(error)) {
                error.forEach(({ fields, message: errorMessage }) => {
                    notif(false, `Field ${fields.join()}`, errorMessage)
                })
            } else {
                notif(false, `Password`, error)
            }
        }
       
        
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Account </title>
            </Head>
            <Header title="Account" items={items} />
            <Stack spacing="md" my={40}>

                <Group align="flex-start" p="md" className="bg-white rounded-md">



                    <Stack spacing="0"
                        sx={(theme) => ({
                            maxWidth: 150,
                            minHeight: 150
                        })}
                    >


                        {editAvatar ?
                            <DropArea onDropFile={onDrop} file={avatarFile} /> : 
                            // <NextImage loader={imageKitLoader} src={userData.imageUrl} width={150} quality={50}/>
                            <Image 
                            
                            withplaceholder="true" size={150}
                                src={userData.imageUrl}
                            />
                        }
                        <Button hidden={editAvatar} onClick={() => setEditAvatar(true)} variant='outline' color="blue" radius={0} size='xs'>change</Button>
                        <Group>
                        <Button mt="xs"  hidden={!editAvatar} onClick={() => setEditAvatar(false)} variant='outline' color="blue" radius={0} size='xs'>Cancel</Button>
                        <Button mt="xs" hidden={!editAvatar} onClick={() => onUpdateAvatar()} variant='filled' color="green" radius={0} size='xs'>Save</Button>
                        </Group>
                        
                    </Stack>

                    <Stack spacing="xs">
                        <Group>
                            <Title order={3} >{userData.name}</Title>
                            <Badge color="violet">{userData.userRoleCode}</Badge>
                        </Group>

                        <Group>
                            <ThemeIcon size={18} color="gray">
                                <Message2 size={14} />
                            </ThemeIcon>
                            <Text size="sm" color="gray"> {userData.email} </Text>
                        </Group>
                        <Blockquote>
                            {userData.bio}
                        </Blockquote>

                    </Stack>
                </Group>
                <Box p="md" className="bg-white rounded-md">
                    <Tabs variant="pills" >
                        <Tabs.Tab label="Overview">
                            <Stack spacing="md" pb="md" mt="lg">
                                <Group position='apart'>
                                    <Title mb="md" order={4}>Profile</Title>
                                    <Button hidden={edit} size='xs' variant='outline' color="blue" onClick={() => setEdit(true)}>
                                        Edit
                                    </Button>
                                </Group>
                                {edit ?
                                    <form onSubmit={profileForm.onSubmit(handleSubmit)} >
                                        <Grid>
                                            <Grid.Col span={2}>
                                                <Text color="gray" size="sm">Full Name</Text>

                                            </Grid.Col>
                                            <Grid.Col span={4}>
                                                <TextInput
                                                    className='w-60'
                                                    id="name"
                                                    placeholder='name'
                                                    {...profileForm.getInputProps('name')}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col span={2}>
                                                <Text color="gray" size="sm">Bio</Text>
                                            </Grid.Col>
                                            <Grid.Col span={4}>
                                                <Textarea
                                                    className='w-60'
                                                    id="bio"
                                                    placeholder='bio'
                                                    {...profileForm.getInputProps('bio')}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Group mt="lg">
                                            <Button size='sm' variant='outline' color="blue" onClick={() => setEdit(false)}>
                                                Cancel
                                            </Button>
                                            <Button size='sm' variant='filled' color="blue" type='submit'>
                                                Save
                                            </Button>
                                        </Group>

                                    </form>
                                    :
                                    <Box>
                                        <Grid>
                                            <Grid.Col span={2}><Text color="gray" size="sm">Full Name</Text></Grid.Col>
                                            <Grid.Col span={4}><Text size="sm">{userData.name}</Text></Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col span={2}><Text color="gray" size="sm">Bio</Text></Grid.Col>
                                            <Grid.Col span={4}><Text size="sm">{userData.bio}</Text></Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col span={2}><Text color="gray" size="sm">Verified at</Text></Grid.Col>
                                            <Grid.Col span={4}><Text size="sm">{(new Date(parseInt(userData.verifiedAt))).toLocaleString()}</Text></Grid.Col>
                                        </Grid>
                                    </Box>


                                }

                            </Stack>


                        </Tabs.Tab>
                        <Tabs.Tab label="Password">
                            <form onSubmit={passwordForm.onSubmit(handleSubmitPassword)} >
                                <Stack spacing="md" pb="md" mt="lg">
                                    <Title mb="md" order={4}>Update password</Title>


                                    <Grid>
                                        <Grid.Col span={2}><Text color="gray" size="sm">Old Password</Text></Grid.Col>
                                        <Grid.Col span={4}>
                                            <TextInput
                                                className='w-60'
                                                id="oldPassword"
                                                type='password'
                                                placeholder='old Password'
                                                {...passwordForm.getInputProps('oldPassword')}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Grid>
                                        <Grid.Col span={2}><Text color="gray" size="sm">New Password</Text></Grid.Col>
                                        <Grid.Col span={4}>
                                            <TextInput
                                                className='w-60'
                                                id="newPassword"
                                                type='password'
                                                placeholder='new password'
                                                {...passwordForm.getInputProps('newPassword')}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Grid>
                                        <Grid.Col span={2}><Text color="gray" size="sm">Confirm Password</Text></Grid.Col>
                                        <Grid.Col span={4}>
                                            <TextInput
                                                className='w-60'
                                                id="confirmPassword"
                                                type='password'
                                                placeholder='confirm password'
                                                {...passwordForm.getInputProps('confirmPassword')}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Group mt="lg">
                                        <Button size='sm' variant='outline' color="blue" onClick={() => setEdit(false)}>
                                            Cancel
                                        </Button>
                                        <Button size='sm' variant='filled' color="blue" type='submit'>
                                            Save
                                        </Button>
                                    </Group>
                                </Stack>
                            </form>
                        </Tabs.Tab>
                    </Tabs>
                </Box>



            </Stack>
        </>
    )
}


export default AccountPage;
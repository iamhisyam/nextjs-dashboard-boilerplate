import { Modal, TextInput, Divider, Input, Button, Group, LoadingOverlay, Select } from "@mantine/core"
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from "react";
import { ValidateSchema } from "@/shared/constants";
import { z } from "zod";
import { fetcher } from "@/lib/fetch";
import { notif } from "@/lib/notification";
import { useUserRoles } from "@/lib/users";

const ModalUserForm = ({ opened, setOpened, data, mutate }) => {
    const [loading, setLoading] = useState(false)
    const initialValues = {
        id: "",
        name: "",
        email: "",
        userRoleCode: "",
        password: ""
    }

    const schema = z.object({
        email: ValidateSchema.user.email,
        ...(!data.id && { password: ValidateSchema.user.password }),
       
        name: ValidateSchema.user.name,
        userRoleCode: ValidateSchema.user.userRoleCode
    })


    const form = useForm({
        schema: zodResolver(schema),
        initialValues

    })

    useEffect(() => {
        //update values

        form.setValues(data)
    }, [data])


    const handleCancel = () => {
        setOpened(false)
    }


    const handleSubmit = async ({ id, name, email, password , userRoleCode }) => {

        const payload = { id, name, email, password, userRoleCode }
        const message = id ? "updated" : "added"
        setLoading(true)
        try {
            const resp = await fetcher("/api/users", {
                method: id ? "PATCH" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            notif(true, `User ${message}`, `Successfully ${message}`)
            setOpened(false)
            mutate()
        } catch (error) {
            notif(false, `User ${message}`, "Fail")
        }

        setLoading(false)
    }

    const { userRoles, isLoading, isError } = useUserRoles()


    return (
        <Modal
            centered
            size="md"
            opened={opened}
            onClose={() => setOpened(false)}
            title="User Form"
        >
            <div className="relative">
                <LoadingOverlay visible={loading} />
                <Divider mb={20} />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Input
                        id="id"
                        hidden
                        {...form.getInputProps('id')}
                    />
                    <TextInput
                        id="name"
                        mt={20}
                        placeholder="name"
                        required
                        label="Name"
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        id="email"
                        mt={20}
                        placeholder="email"
                        required
                        label="Email"
                        {...form.getInputProps('email')}
                    />

                    <Select
                        id="userRoleCode"
                        mt={20}
                        label="Role"
                        required
                        placeholder="Select Role"
                        data={userRoles.map(({ code, name }) => ({ label: name, value: code }))}
                        {...form.getInputProps('userRoleCode')}
                    />

                    <TextInput
                        id="password"
                        //hide password if only update data
                        hidden={data.id ? true : false}
                        mt={20}
                        placeholder="password"
                        type="password"
                        //not required when update data
                        required={data.id ? false: true}
                        label={data.id ? "" : "Password"}
                        {...form.getInputProps('password')}
                    />


                    {/* <Divider my={20} /> */}
                    <Group mt={20} position="right" >
                        <Button onClick={handleCancel} variant="outline" color="blue">Cancel</Button>
                        <Button loading={loading} type="submit" variant="filled" color="blue" >Submit</Button>
                    </Group>

                </form>
            </div>
        </Modal>
    )
}

export default ModalUserForm;
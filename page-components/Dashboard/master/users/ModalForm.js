import { Modal, TextInput, Divider, Input, Button, Group } from "@mantine/core"
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from "react";
import { ValidateSchema } from "@/shared/constants";
import { z } from "zod";

const ModalUserForm = ({ opened, setOpened, data }) => {
    const initialValues = {
        id: "",
        name: "",
        email: "",
        password: ""
    }

    const schema = z.object({
        email: ValidateSchema.user.email,
        password: ValidateSchema.user.password.optional(),
        name: ValidateSchema.user.name
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

    const handleSubmit = (values) => {
        console.log(values)
    }


    return (
        <Modal
            centered
            size="md"
            opened={opened}
            onClose={() => setOpened(false)}
            title="User Form"
        >

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

                <TextInput
                    id="password"
                    hidden={data.id ? true : false}
                    mt={20}
                    placeholder="password"
                    type="password"
                    required={false}
                    label={data.id ? "" : "Password"}
                    {...form.getInputProps('password')}
                />
                <Divider my={20} />
                <Group position="right" >
                    <Button onClick={handleCancel} variant="outline" color="blue">Cancel</Button>
                    <Button type="submit" variant="filled" color="blue" >Submit</Button>
                </Group>

            </form>

        </Modal>
    )
}

export default ModalUserForm;
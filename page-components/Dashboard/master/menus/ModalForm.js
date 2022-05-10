import { Modal, TextInput, Divider, Input, Button, Group, LoadingOverlay, Select, MultiSelect } from "@mantine/core"
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from "react";
import { ValidateSchema } from "@/shared/constants";
import { z } from "zod";
import { fetcher } from "@/lib/fetch";
import { notif } from "@/lib/notification";
import { useUserRoles } from "@/lib/users";
import { useMenus } from "@/lib/menus";

const ModalUserForm = ({ opened, setOpened, data, mutate }) => {
    const [loading, setLoading] = useState(false)
    const initialValues = {
        id: "",
        name: "",
        slug: "",
        iconName: "",
        parentMenuId: null,

    }

    const schema = z.object({
        name: ValidateSchema.menu.name,
        slug: ValidateSchema.menu.slug,
        parentMenuId: ValidateSchema.menu.parentMenuId.optional(),
        iconName: ValidateSchema.menu.iconName.optional(),
        userRoleCode: ValidateSchema.menu.userRoleCode
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


    const handleSubmit = async ({ id, name, slug, iconName, userRoleCode, parentMenuId }) => {

        const payload = { id, name, slug, iconName, userRoleCode, parentMenuId }
        const message = id ? "updated" : "added"
        setLoading(true)
        try {
            const resp = await fetcher("/api/menus", {
                method: id ? "PATCH" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            notif(true, `Menu ${message}`, `Successfully ${message}`)
            setOpened(false)
            mutate()
        } catch (error) {
           
            if (Array.isArray(error)) {
                error.forEach(({ fields, message: errorMessage }) => {
                    notif(false, `Field ${fields.join()}`, errorMessage)
                })
            } else {
                notif(false, `Menu ${message}`, error)
            }

        }

        setLoading(false)
    }

    const { userRoles } = useUserRoles()
    const { menus } = useMenus()

    return (
        <Modal
            centered
            size="md"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Menu Form"
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
                        id="slug"
                        mt={20}
                        placeholder="slug"
                        required
                        label="Slug"
                        {...form.getInputProps('slug')}
                    />

                    <TextInput
                        id="iconName"
                        mt={20}
                        placeholder="Icon Name"

                        label="Icon Name"
                        {...form.getInputProps('iconName')}
                    />

                    <Select
                        id="parentMenuId"
                        mt={20}
                        label="Parent Menu"
                        
                        placeholder="Select Parent"
                        //only show menu that doesnt have parent
                        //convert id to string avoid bug
                        data={menus.filter(({parentMenu})=>!parentMenu).map(({ id, name }) => ({ label: name, value: id.toString() }))}
                        {...form.getInputProps('parentMenuId')}
                    />

                    <MultiSelect
                        id="userRoleCode"
                        mt={20}
                        label="Role"
                        required
                        placeholder="Select Role"
                        data={userRoles.map(({ code, name }) => ({ label: name, value: code }))}
                        {...form.getInputProps('userRoleCode')}
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
import { Box, Modal, Text, Divider, Group, Button, Stack } from "@mantine/core"
import { AlertTriangle  } from "tabler-icons-react"

const ModalDelete = ({ opened, setOpened, data }) => {

    const handleCancel = () => {
        setOpened(false)
    }

    const handleDelete = (values) => {
       
        console.log(values)
    }

    return (
        <Modal
            centered
            title="Delete confirmation"
            opened={opened}
        >
                <Divider my={20}/>
                <Group mb={20}  >
                    <AlertTriangle size={50} color="red "/>
                    <Text size="lg" align="center" >Warning</Text>
                </Group>
                
                <Text>Do you want delete <strong>{data.name}</strong>?</Text>
                <Divider my={20}/>
            <Group position="right" >
                <Button onClick={handleCancel} variant="outline" color="red">Cancel</Button>
                <Button onClick={()=>handleDelete(data)} variant="filled" color="red" >Delete</Button>
            </Group>
        </Modal>
    )
}

export default ModalDelete
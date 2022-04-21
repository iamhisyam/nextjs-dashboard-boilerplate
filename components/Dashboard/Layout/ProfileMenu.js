import { Menu, Divider, Text, Avatar, useMantineTheme } from '@mantine/core';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight, Logout } from 'tabler-icons-react';
import { useSession, signOut  } from 'next-auth/react';

const ProfileMenu = ({children}) => {
 
const { data :  session, status } = useSession()

    return (
      <Menu control={children}>
        <Menu.Label>{session?.user?.name}</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Profile</Menu.Item>
      
  
        <Divider />
  
        <Menu.Item color="red" onClick={()=>signOut()} icon={<Logout size={14} />}>Logout</Menu.Item>
      </Menu>
    );
  }


  const WrapperProfileMenu = ({}) => {
    const theme = useMantineTheme();
    return (
      <ProfileMenu>
         <Avatar color={theme.colors.blue[9]} radius="xl" />
      </ProfileMenu>
    )
  }

  export default WrapperProfileMenu;
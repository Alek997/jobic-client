import React from 'react'
import { Avatar, AvatarProps } from '@chakra-ui/avatar'
import { useUserInfo } from 'services/userService'

const AvatarImage: React.FC<AvatarProps> = props => {
  const userInfo = useUserInfo()

  return (
    <Avatar
      name="Avatar Image"
      src={
        userInfo.data?.imageUrl
          ? userInfo.data?.imageUrl
          : `https://eu.ui-avatars.com/api/?name=${userInfo.data?.firstName}+${userInfo.data?.lastName}`
      }
      {...props}
    />
  )
}

export default AvatarImage

import React from 'react'
import { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from '../users/UserItem'

function UserResult() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      heaaders: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    )
  }


}

export default UserResult

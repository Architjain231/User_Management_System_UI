import Head from 'next/head'
import AddUser from '../Components/AddUser'
import NavBar from '../Components/NavBar'
import UserList from '../Components/UserList'

export default function Home() {
  return (
    <div>
      <Head>
        <title>USER MANAGEMENT</title>
      </Head>

      <main >
       <NavBar/>
       <AddUser/>
      
      </main>

    </div>
  )
}

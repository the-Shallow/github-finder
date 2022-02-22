import {  useContext } from "react"
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";

function UserResults() {

    const { users,isLoading} = useContext(GithubContext);



  return isLoading ? <Spinner /> : (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {users.map((item) => (
              <UserItem key={item.id} user={ item } />
          ))}
      </div>
  )
}

export default UserResults
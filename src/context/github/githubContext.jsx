import { createContext, useReducer } from "react";
import GithubReducer from "../../context/github/GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        repos:[],
        isLoading:false
    }

    const [state , dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async (text) => {

        setLoading();
        console.log(text);
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`);

        const data = await response.json();
        
        dispatch({
            type: 'GET_USERS',
            payload:data.items
        })

        if (data.items.length === 0) {
            return false;   
        }

        return true;
    }


    const getUser = async (login) => {

        setLoading();
        
        
        const response = await fetch(`https://api.github.com/users/${login}`);

        const data = await response.json();

        console.log(data);

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
        
            dispatch({
                type: 'SET_USER',
                payload: data
            })
        }
    }

    const getRepos = async (login) => {

        setLoading();

        const params = new URLSearchParams({
            search: 'created',
            per_page:10
        })
       
        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`);

        const data = await response.json();

        console.log(data);
        
        dispatch({
            type: 'GET_REPOS',
            payload:data
        })

   }

    const clearUsers = () => {
       dispatch({ type: 'CLEAR_USERS' })
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' });

    return <GithubContext.Provider value={{
        users:state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos:state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;
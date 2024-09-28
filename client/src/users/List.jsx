import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import EachUser from './EachUser';

export default function List() {

    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    const fetchData = async () => {
        const page = searchParams.get("page") ? "&page=" + searchParams.get("page") : ''
        try {
            const response = await fetch(`${API_URL}/users?sort=-id&size=5${page}`)
            const json = await response.json()
            setUsers(json.data.items)
            setPages(json.data.total_pages)
            console.log("Usuários: ", json.data.items)
            console.log("Total de páginas: ", json.data.total_pages)
        } catch (e) {
            console.log("error", e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    let myPage = searchParams.get("page") ? searchParams.get("page") : 0

    return (
        <div className="flex justify-center">
            <div className="lg:w-1/3 w-full">
                <div className="p-10">
                    <div className="mb-10 flex items-center justify-between">
                        <h1 className="font-bold">CRUD em Golang + React</h1>
                        <button className="bg-purple-700 text-white px-3 py-2 rounded hover:scale-105 duration-300">Adicionar usuário</button>
                    </div>
                    <div>
                        {users.length > 0 ? users.map((user, key) => <EachUser key={key} user={user} fetchData={fetchData}/>) : ''} 
                    </div>

                    <div className="mt-10">
                            {Array.from({ length: pages }, (_, index) => index + 1).map((pg, key) =>
                                <Link className={`border px-3 py-1 mr-3 rounded ${myPage == key ? 'bg-purple-600 text-purple-100' : ''}`} to={`?page=${key}`} key={key}>{key + 1}</Link>)}
                        </div>
                </div>
            </div>
        </div>
        )
    
}

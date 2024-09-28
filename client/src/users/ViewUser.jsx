import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config'

export default function ViewUser() {

    let { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/users/${id}`)
                const json = await response.json()
                setUser(json.data)
                setLoading(false)
            } catch (error) {
                console.log("erro", error)
                setLoading(false)
            }
        }

        fetchUser()
    }, [id])

    return (
        <div>
            { !loading ?
                <div className="flex justify-center">
                    <div className="lg:w-1/3 w-full">
                        <div className="p-10">
                            <div className="mb-10 flex item-center justify-between">
                                <Link to="/"><h1 className="font-bold">Voltar</h1></Link>
                            </div>
                            <div className="bg-slate-100 rounded-lg px-5">
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Nome</div>
                                    <div className="mr-4 text-slate-800 font-medium">{user.nome}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Email</div>
                                    <div className="mr-4 text-slate-800 font-medium">{user.email}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Data</div>
                                    <div className="mr-4 text-slate-800 font-medium">{user.data}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Cidade</div>
                                    <div className="mr-4 text-slate-800 font-medium">{user.cidade}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Pais</div>
                                    <div className="mr-4 text-slate-800 font-medium">{user.pais}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
            }
        </div>
    )
}

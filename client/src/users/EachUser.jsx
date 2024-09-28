import React from 'react'
import { useState} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import {API_URL} from '../config'

export default function EachUser({user, fetchData}) {

    const [nameValue, setNameValue] = useState(user.nome);
    const [emailValue, setEmailValue] = useState(user.email);
    const [dateValue, setDateValue] = useState(moment(user.date).format("YYYY-MM-DD"));
    const [cityValue, setCityValue] = useState(user.cidade);
    const [countryValue, setCountryValue] = useState(user.pais);


    const openModal = () => {
        document.getElementById("new-modal-" + user.ID).classList.remove("hidden")
    }

    const closeModal = () => {
        document.getElementById("new-modal-" + user.ID).classList.add("hidden")
    }

    const completeForm = () => {
        closeModal()
        fetchData()
    }

    const updateUser = async (e) => {
        e.preventDefault()
        var form = document.getElementById(`editform-${user.ID}`)
        var formData = new FormData(form)
        axios.patch(`${API_URL}/users/${user.ID}`, formData)
        .then(res => completeForm(form))
        .catch(error => console.log(error.response))
    }

    const deleteUser = () => {

        if(window.confirm("Você tem certeza de que deseja apagar o usuário?") == true) {
            axios.delete(`${API_URL}/users/${user.ID}`)
            .then(res => fetchData())
            .catch(error => console.log(error.response))
        } else {
            console.log("Você cancelou a deleção do usuário.")
        }
    }

    return (
        <div className="bg-slate-100 rounded-lg mb-4 p-4 border-2 border-transparent hover:border-2 hover:border-purple-700">
            <div>
                <div>
                    <div className="font-medium">{user.nome}</div>
                    <div className="text-slate-400">{user.email}</div>
                </div>
                <div className="text-sm flex space-x-4 mt-4">
                    <Link to={`/profile/${user.ID}`} className="hover:scale-110 transition-all transition-duration-3">Ver perfil</Link>
                    <button className="hover:scale-110 transition-all" onClick={openModal}>Editar</button>
                    <button className="text-red-600 hover:scale-110 transition-all" onClick={deleteUser}>Deletar</button>
                </div>
            </div>

            <div className="relative z-10 hidden" aria-labelledby='modal-title' role="dialog" aria-modal="true" id={`new-modal-${user.ID}`}>
                <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                            <form id={`editform-${user.ID}`} onSubmit={updateUser} action="">
                                <div className="bg-white">
                                    <div className="flex justify-between px-8 py-4 border-b">
                                        <h1 className="font-medium">Atualizar usuário</h1>
                                        <button type="button" onClick={closeModal}>Fechar</button>
                                    </div>
                                    <div className="px-8 py-8">
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                                            <input type="text" name="nome" value={nameValue} onChange={(e) => setNameValue(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                            <input type="text" name="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Data</label>
                                            <input type="date" name="data" value={dateValue} onChange={(e) => setDateValue(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Cidade</label>
                                            <input type="text" name="cidade" value={cityValue} onChange={(e) => setCityValue(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">País</label>
                                            <input type="text" name="pais" value={countryValue} onChange={(e) => setCountryValue(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="bg-blue-500 text-white py-1.5 px-4 rounded hover:scale-105 transition-all">Atualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

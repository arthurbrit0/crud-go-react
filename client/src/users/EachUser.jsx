import React from 'react'
import {Link} from 'react-router-dom'

export default function EachUser({user, fetchData}) {
  return (
    <div className="bg-slate-100 rounded-lg mb-4 p-4 border-2 border-transparent hover:border-2 hover:border-purple-700 hover:scale-105 duration-300">
      <div>
        <div>
            <div className="font-medium">{user.nome}</div>
            <div className="text-slate-400">{user.email}</div>
        </div>
        <div className="text-sm flex space-x-4 mt-4">
            <Link to={`/profile/${user.ID}`} className="hover:scale-110 transition-all transition-duration-3">Ver perfil</Link>
            <button className="hover:scale-110 transition-all">Editar</button>
            <button className="text-red-600 hover:scale-110 transition-all">Deletar</button>
        </div>
      </div>
    </div>
  )
}

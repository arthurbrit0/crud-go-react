import React from 'react'
import {Link} from 'react-router-dom'

export default function EachUser({user, fetchData}) {
  return (
    <div className="bg-slate-100 rounded-lg mb-4 p-4 hover:border hover:border-purple-700 hover:scale-105 duration-300">
      <div>
        <div>
            <div className="font-medium">{user.nome}</div>
            <div className="text-slate-400">{user.email}</div>
        </div>
        <div className="text-sm flex space-x-4 mt-4">
            <Link to={`/profile/${user.ID}`}>Ver perfil</Link>
            <button>Editar</button>
            <button className="text-red-600">Deletar</button>
        </div>
      </div>
    </div>
  )
}
